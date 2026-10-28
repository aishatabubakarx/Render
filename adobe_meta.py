# Adobe Stock categories: 1 Animals,2 Buildings,3 Business,4 Drinks,5 Environment,6 States of Mind,7 Food,8 Graphic Resources,9 Hobbies,10 Industry,11 Landscapes,12 Lifestyle,13 People,14 Plants,15 Culture and Religion,16 Science,17 Social Issues,18 Sports,19 Technology,20 Transport,21 Travel
CAT={'Landscapes':11,'Graphic Resources':8,'Science':16,'Technology':19,'Environment':5}
BANNED={'youtube','chatgpt','instagram','tiktok','facebook','twitter','google','apple','netflix','disney','star wars','blood'}
from concepts import CONCEPTS
ADOBE={c['id']:(c['title'][:200],CAT[c['category']]) for c in CONCEPTS}
