from flask import Flask, jsonify, request
import json
# from openai import OpenAI
import json
import requests
import re

app = Flask(__name__)
object = {
        "Cuisine": [
            {
                "id": 1,
                "name": "Italian",
                "ingredients": [
                    {
                        "name": "Spaghetti",
                    },
                    {
                        "name": "Tomato",
                    },
                    {
                        "name": "Onion",
                    },
                    {
                        "name": "Garlic",
                    },
                    {
                        "name": "Basil",
                    },
                    {
                        "name": "Olive Oil",
                    },
                    {
                        "name": "Salt",
                    },
                    {
                        "name": "Pepper",
                    },
                ],
            },
            {
                "id": 2,
                "name": "Japanese",
                "ingredients": [
                    {
                        "name": "Rice",
                    },
                    {
                        "name": "Soy Sauce",
                    },
                    {
                        "name": "Sake",
                    },
                    {
                        "name": "Mirin",
                    },
                    {
                        "name": "Sugar",
                    },
                    {
                        "name": "Salt",
                    },
                    {
                        "name": "Pepper",
                    },
                ],
            }
        ],
    }


with open('cuisine.json') as c:
    data = json.load(c)

with open('ingredients.json') as i:
    ingred = json.load(i)

with open('recipes.json') as r:
    recipe = json.load(r)

@app.get('/')
def home():
    return 'Hello, World!'


@app.get('/about')
def about():
    object = {
        "name": "Rafael",
        "age": 25
    }
    return object


@app.get('/cuisine')
def cuisine():  
    name = request.args.get('name')
    for cuisine in object['Cuisine']:
        if cuisine['name'] == name:
            return cuisine


@app.get('/getData')
def get_data():
    return jsonify(data)

@app.post('/searchData')
def search():
    request_data = request.get_json()  # Get data from POST request
    name = request_data['name']  # Extract name from request data

    results = []
    for cuisine in data['Cuisine']:
        for ingredient in cuisine['ingredients']:
            if ingredient['name'].lower() == name.lower():
                results.append(cuisine)
                break  # Break after finding the ingredient to avoid duplicates

    # Return results as JSON
    return jsonify(results)

@app.get('/ingredients')
def ingredients():
    results = []
    for ingredient in ingred['ingredients']:
        results.append(ingredient)
    return jsonify(results)

@app.get('/ingredients/<string:name>')
def get_ingredient(name):
    for ingredient in ingred['ingredients']:
        if ingredient['name'] == name:
            return jsonify(ingredient)
    return jsonify({'error': 'Ingredient not found'})


@app.get('/recipes')
def recipes():
    results = []
    for recipes in recipe['recipes']:
        results.append(recipes)
    return jsonify(results)

@app.get('/recipes/<string:name>')
def get_recipe(name):
    for recipes in recipe['recipes']:
        if recipes['name'] == name:
            return jsonify(recipes)
    return jsonify({'error': 'recipe not found'})


# @app.post('/chatbot')
# def chatbot():
#     request_data = request.get_json()  # Get data from POST request
#     base64_string = request_data.get('base64_string')
    
#     if base64_string is not None:  # Create a new chatbot instance (or use a global one
#         response = imageToIngredient(base64_string)
#         return jsonify(response)

#     else:
#         return jsonify({'error': 'No base64 string provided'}), 400
    

# def imageToIngredient(base64_image):
#     # OpenAI API Key
#     api_key = "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"
    
#     headers = {
#     "Content-Type": "application/json",
#     "Authorization": f"Bearer {api_key}"
#     }

#     payload = {
#     "model": "gpt-4-vision-preview",
#     "messages": [
#         {
#         "role": "user",
#         "content": [
#             {
#             "type": "text",
#             "text": "ingridients in image?"
#             },
#             {
#             "type": "image_url",
#             "image_url": {
#                 "url": f"data:image/jpeg;base64,{base64_image}"
#             }
#             }
#         ]
#         }
#     ],
#     "max_tokens": 300
#     }

#     response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

#     #print(response.json())
#     #print('----------------------------')
#     json_data = response.json()
#     json_string = json.dumps(json_data)
#     pattern = re.compile(r'"content": "(.*?)"')

#     # Search for the pattern in the JSON string
#     match = pattern.search(json_string)
#     listofitem =[]
#     ingridients =["water",
#     "milk",
#     "tea",
#     "sugar",
#     "ginger",
#     "Pasta",
#     "Olive Oil",
#     "Garlic",
#     "Besan",
#     "Herbs",
#     "Coriander Leaves",
#     "Cheese",
#     "Salt",
#     "Cream",
#     "Butter",
#     "pepper",
#     "Onions",
#     "Tomatoes",
#     "Potatoes",
#     "Green Chilies",
#     "Coriander Leaves (Cilantro)",
#     "Curry Leaves",
#     "Cauliflower",
#     "Milk Powder",
#     "Ghee",
#     "Spinach",
#     "Lentils (Masoor Dal, Toor Dal, Urad Dal)",
#     "Chickpeas (Chana)",
#     "Red Kidney Beans (Rajma)",
#     "Split Yellow Peas (Chana Dal)",
#     "Green Mung Beans",
#     "Cumin Seeds",
#     "Mustard Seeds",
#     "Coriander Powder",
#     "Cumin Powder",
#     "Turmeric Powder",
#     "Red Chili Powder",
#     "Garam Masala",
#     "Asafoetida (Hing)",
#     "Fenugreek Seeds (Methi)",
#     "Cardamom",
#     "Cinnamon",
#     "Cloves",
#     "Bay Leaves",
#     "Black Pepper",
#     "Basmati Rice",
#     "Wheat Flour (Atta)",
#     "Rice Flour",
#     "Semolina (Sooji)",
#     "Gram Flour (Besan)",
#     "Yogurt",
#     "Paneer (Indian Cottage Cheese)",
#     "Mustard Oil",
#     "Tamarind",
#     "Coconut (Grated, Coconut Milk)",
#     "Fresh Mint",
#     "Jaggery",
#     "Cashews",
#     "Almonds",
#     "Raisins",
#     "Poppy Seeds (Khus Khus)",
#     "Sesame Seeds (Til)",
#     "Dried Red Chilies",
#     "Rice (Basmati, Jasmine, Sona Masoori)",
#     "Lentils (Masoor dal, Toor dal, Moong dal, Urad dal)",
#     "Flour (Wheat flour, Chickpea flour)",
#     "Vanilla Extract",
#     "Ghee (clarified butter)",
#     "Vegetable oil",
#     "Coconut oil",
#     "Fish",
#     "Fenugreek seeds",
#     "Fennel seeds",
#     "Coriander seeds",
#     "Cardamom (green and black)",
#     "Tamarind paste",
#     "Mango powder (amchur)",
#     "Palm sugar",
#     "Rock salt (sendha namak)",
#     "Regular salt",
#     "Black salt",
#     "Fresh ginger",
#     "Eggplant (brinjal)",
#     "Okra (bhindi)",
#     "Bell peppers",
#     "Carrots",
#     "Green peas",
#     "Cabbage",
#     "Radish",
#     "Ginger-Garlic Paste",
#     "Sweet potatoes",
#     "Pumpkins",
#     "Bottle gourd (lauki)",
#     "Bitter gourd (karela)",
#     "Ridge gourd (turiya)",
#     "Coconut (fresh and desiccated)",
#     "Yogurt (curd)",
#     "Buttermilk",
#     "Pistachios",
#     "Sunflower seeds",
#     "Poppy seeds",
#     "Sesame seeds",
#     "Groundnuts (peanuts)",
#     "Coconut milk",
#     "Basa fish",
#     "Salmon",
#     "Shrimp (prawns)",
#     "Chicken",
#     "Lamb",
#     "Goat meat (mutton)",
#     "Eggs",
#     "Fresh cilantro (coriander leaves)",
#     "Fresh mint leaves",
#     "Fenugreek leaves (methi)",
#     "Dill leaves",
#     "Chives",
#     "Lemon",
#     "Lime",
#     "Vinegar",
#     "Soy sauce",
#     "Mustard sauce",
#     "Green chutney",
#     "Mint chutney",
#     "Tamarind chutney",
#     "Mango chutney",
#     "Tomato ketchup",
#     "Saffron",
#     "Green cardamom powder",
#     "Nutmeg",
#     "Star anise",
#     "Black cardamom",
#     "Pomegranate seeds",
#     "Rose water",
#     "Kewra water",
#     "Cinnamon sticks",
#     "Black peppercorns",
#     "White peppercorns",
#     "Red and green bell peppers",
#     "Black-eyed peas (lobia)",
#     "Split black gram (urad dal)",
#     "Tofu",
#     "Safflower oil (kardi oil)",
#     "Mustard greens (sarson ka saag)",
#     "Sorrel leaves (gongura)",
#     "Cilantro seeds (coriander seeds)",
#     "Yellow split peas (chana dal)",
#     "Papadums",
#     "Sago (sabudana)",
#     "Semolina (suji)",
#     "Lentil flour (moong dal flour)",
#     "Semolina (rava)",
#     "Black gram flour (urad dal flour)",
#     "Sorghum flour (jowar atta)",
#     "Millet flour (bajra atta)",
#     "Pearl millet (jowar)",
#     "Finger millet (ragi)",
#     "Turmeric leaves (haldi patta)",
#     "Amaranth leaves (chaulai)",
#     "Drumstick leaves (moringa)",
#     "Banana leaves",
#     "Colocasia leaves (arbi patta)",
#     "Lotus stem (kamal kakdi)",
#     "Jackfruit (kathal)",
#     "Raw mango",
#     "Plantains (kachcha kela)",
#     "Black chickpeas (kala chana)",
#     "White chickpeas (safed chana)",
#     "Bengal gram (chana dal)",
#     "Green moong beans",
#     "Black gram lentils (urad dal)",
#     "Kidney beans (rajma)",
#     "Black lentils (sabut urad dal)",
#     "Pigeon peas (arhar/toor dal)",
#     "Red lentils (masoor dal)",
#     "Cowpeas (lobia)",
#     "Indian gooseberry (amla)",
#     "Wood apple (bael)",
#     "Chia seeds",
#     "Pumpkin seeds",
#     "Pine nuts (chilgoza)",
#     "Macadamia nuts",
#     "Water chestnuts (singhara)",
#     "Arrowroot powder",
#     "Dosa rice",
#     "Poha (flattened rice)",
#     "Idli rice",
#     "Millet grains",
#     "Sorghum (jowar)",
#     "Pearl millet (bajra)",
#     "Foxtail millet (kangni)",
#     "Barnyard millet (jhangora)",
#     "Kodo millet (kodra)",
#     "Proso millet (cheena)",
#     "Quinoa",
#     "Couscous",
#     "Bulgur wheat",
#     "Barley",
#     "Oats",
#     "Whole wheat grains",
#     "Whole wheat flour (atta)",
#     "Spinach flour (palak atta)",
#     "Beetroot flour",
#     "Pearl millet flour (bajra atta)",
#     "Finger millet flour (ragi atta)",
#     "Chickpea flour (besan)",
#     "Fenugreek flour (methi atta)",
#     "Gram flour (moong dal atta)",
#     "Black gram flour (urad dal atta)",
#     "Lentil flour (masoor dal atta)",
#     "Rice flour (chawal atta)",
#     "Semolina flour (rava)",
#     "Millet flour",
#     "Black gram lentil flour (urad dal flour)",
#     "Sorghum grain (jowar)",
#     "Pearl millet grain (bajra)",
#     "Finger millet grain (ragi)",
#     "Foxtail millet grain (kang"]

#     # Check if a match is found
#     if match:
#         # Extract the content from the match
#         extracted_content = match.group(1)
        
#     contents = extracted_content.lower()
#     for item in ingridients:
#         # Example string

#         if item.lower() in contents:
#           listofitem.append(item)

#     #print(listofitem)
#     json_data1 = json.dumps(listofitem)
#     result1 = chatBotResponse(json_data1 + "give me recipes which includes this ingredients")

#     return result1

# def chatBotResponse(userText):
#     responseToSend = {}
#     #json_object
#     client = OpenAI(
#     # defaults to os.environ.get("OPENAI_API_KEY")
#     api_key="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",
#     )

#     chat_completion = client.chat.completions.create(
#      messages=[
#         {"role": "system", "content": "You are an AI chef specializing in all things food-related including recipes, cooking techniques, food history, nutritional information, and food culture around the world. You can help users decide what to cook for dinner, explain how to perfect their baking skills, advise on dietary needs, and share the fascinating stories behind their favorite dishes. also you must give a response in first line if user has provided ingredients list or is asking for recipe in a way that if user wants to know the recipe give say Recipie if user askes gives ingredient say Ingredient if it's not Ingredient or Recipie say general for that you must know if user has given you ingredients or recipe and restrict responses to only food related questions and dont give response if asked off topic questions, you should also give one string list which only contains ingredient list."},
#         {"role": "user", "content": userText},
#       ],
#     model="gpt-4",
#     )
#     #print(chat_completion.choices[0].message.content)
#     response = chat_completion.choices[0].message.content
#     responseToSend['message'] = response
#     ingredientList = client.chat.completions.create(
#      messages=[
#         {"role": "system", "content": "you are an AI tool which only returns list of Ingredients given in the message. don't include the amout or any other things. just the ingredient nothing else should be in that list, if there is extra ingrident in same list add it as next ingredient. you will only give respone in json format. if message contains no ingredient you should return 00 text only"},
#         {"role": "user", "content": response},
#       ],
#     model="gpt-4",
#     )
#     responseToSend['ingredients'] = json.loads(ingredientList.choices[0].message.content)
#     #print(type(json_object))
#     #print(responseToSend)

#     return responseToSend

# # result = chatBotResponse("'water', 'onions', 'tomatoes', 'carrots'")
# # a1=result['ingredients']['Ingredients']
# # print("this is list ",a1)
# # print(result["message"])
# # set1 = {x.lower() for x in ['Salt', 'water', 'Fresh mint leaves', 'coriander leaves', 'Saffron strands', 'warm milk']}
# # set2 = {x.lower() for x in result['ingredients']['Ingredients']}
# # common_elements = list(set(set1).intersection(set2))
# # print(common_elements)
# # imageresp = imageToIngredient('hi')
# # print("this is image ",imageresp)