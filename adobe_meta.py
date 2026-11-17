# Adobe Stock categories: 1 Animals,2 Buildings,3 Business,4 Drinks,5 Environment,6 States of Mind,7 Food,8 Graphic Resources,9 Hobbies,10 Industry,11 Landscapes,12 Lifestyle,13 People,14 Plants,15 Culture and Religion,16 Science,17 Social Issues,18 Sports,19 Technology,20 Transport,21 Travel
BANNED = {'youtube', 'chatgpt', 'matrix style', 'instagram', 'tiktok', 'facebook', 'twitter', 'google', 'apple', 'netflix', 'disney', 'github', 'npm', 'whatsapp', 'snapchat', 'paypal', 'visa', 'mastercard', 'bitcoin', 'ethereum'}
# first match wins; anything else = 8 Graphic Resources (backgrounds, overlays, UI elements)
CATEGORY_RULES = [
    (3,  ['business', 'finance', 'revenue', 'chart', 'growth', 'sale', 'money', 'cash', 'payment', 'bank', 'invest', 'market', 'stock', 'profit', 'office']),
    (19, ['tech', 'data', 'network', 'neural', 'ai ', 'cyber', 'code', 'digital', 'vpn', 'cloud', 'server', 'circuit', 'hologra', 'robot', 'blockchain', 'smart']),
    (16, ['space', 'planet', 'earth', 'galaxy', 'atom', 'molecule', 'dna', 'science', 'orbit', 'satellite', 'cell', 'lab']),
    (5,  ['weather', 'rain', 'snow', 'storm', 'cloud', 'fire', 'water', 'ocean', 'wave', 'forest', 'nature', 'wind', 'ice']),
    (11, ['mountain', 'landscape', 'sunrise', 'sunset', 'horizon', 'sky']),
    (14, ['flower', 'leaf', 'leaves', 'plant', 'tree', 'lotus', 'garden']),
    (20, ['car', 'truck', 'van', 'delivery', 'plane', 'flight', 'ship', 'train', 'transport', 'rocket']),
    (7,  ['food', 'coffee', 'pizza', 'fruit', 'citrus', 'orange', 'kitchen']),
    (15, ['christmas', 'new year', 'holiday', 'celebration', 'fireworks', 'festival', 'diwali', 'halloween']),
    (12, ['heart', 'love', 'wedding', 'health', 'medical', 'fitness', 'music']),
]
STOP = {'the', 'and', 'with', 'for', 'of', 'a', 'to', 'in', 'on', 'at', 'from', 'by', 'or', 'an', 'over', 'into'}
JUNK = {'rebuilt', 'live', 'pack', 'standalone', 'original', 'look', 'batch', 'concepts', 'wave', 'master', 'lab', 'loop', 'standalone animation'}
