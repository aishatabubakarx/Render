"""EffectCraft finishing stage (optional, runs in the GitHub package job when the workflow input `effectcraft` is on).
EffectCraft (github.com/storytold/effectcraft) is an After-Effects-style compositor with a headless CLI. This stage imports a finished clip,
applies effects from its effect list, and renders it back with ProRes/H.264. It was tested against EffectCraft 0.20.0 (Linux x86_64 release, headless CLI): imported a clip, applied Glow with parameters, wrote H.264 and ProRes. It is still FAIL-SOFT: Any error leaves the original clip untouched and prints a warning.

concepts.py:  ec=['Glow', 'CC Radial Blur']                         effect names as EffectCraft lists them (docs/effects.md)
              ec=[{'effect': 'Glow', 'set': {'threshold': 35, 'radius': 30, 'intensity': 1.6}}]   parameter names from `effectcraft-cli props`
"""
import json, os, shutil, subprocess, sys, tempfile

def run(clip, effects, concept=None):
    cli = shutil.which('effectcraft-cli')
    if not cli:
        print(f'WARN ec_stage: effectcraft-cli not found, skipping {os.path.basename(clip)}'); return False
    work = tempfile.mkdtemp(prefix='ec_'); proj = os.path.join(work, 'work.ecproj'); ext = os.path.splitext(clip)[1]; out = os.path.join(work, 'out' + ext)
    src = os.path.join(work, 'in' + ext); shutil.copy(clip, src); comp = 'in'            # EffectCraft names the new comp after the footage file
    effects = [{'effect': e} if isinstance(e, str) else e for e in effects]
    steps = [{'command': 'file.import', 'params': {'paths': [src]}}, {'command': 'file.newCompFromSelection', 'params': {'single': True}}]
    steps += [{'command': 'effect.apply', 'params': {'effect': e['effect'], 'layers': [1]}} for e in effects]
    def cli_run(*args, timeout=600):
        return subprocess.run([cli, *args], check=True, capture_output=True, text=True, timeout=timeout)
    try:
        cmds = os.path.join(work, 'steps.json'); json.dump(steps, open(cmds, 'w'))
        cli_run('run', '--commands', cmds, '--empty', '--save-as', proj)
        for i, e in enumerate(effects, 1):                      # optional parameter values, e.g. {'effect':'Glow','set':{'threshold':50,'radius':25}}
            for path, val in (e.get('set') or {}).items():
                cli_run('set', comp, '#1', f'effects/#{i}/{path}', json.dumps(val), '--project', proj, '--save')
        fmt = 'prores' if ext == '.mov' else 'h264'
        cmd = ['render', '--comp', comp, '--out', out, '--format', fmt, '--project', proj, '--quality', 'best']
        if fmt == 'prores': cmd += ['--prores', 'hq']
        cli_run(*cmd, timeout=6 * 3600)
        if os.path.exists(out) and os.path.getsize(out) > 1e5:
            shutil.move(out, clip); print(f'ec_stage: finished {os.path.basename(clip)} with {len(effects)} effect(s)'); return True
        print(f'WARN ec_stage: no output for {os.path.basename(clip)}, kept original'); return False
    except Exception as ex:      # never break the render because of the optional stage
        msg = getattr(ex, 'stderr', '') or str(ex)
        print(f'WARN ec_stage: {os.path.basename(clip)} kept un-finished: {str(msg)[:400]}'); return False
    finally:
        shutil.rmtree(work, ignore_errors=True)

if __name__ == '__main__':
    run(sys.argv[1], sys.argv[2].split(','))
