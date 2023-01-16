import os
import openai

openai.api_key = "API_KEY"


p = "Provide a summary of what is expected to be completed:"
file = open('title.txt', 'r')
for line in file:
    p+= line
response = openai.Completion.create(
    model="text-davinci-003",
    prompt=p,
    temperature=0.7,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
)
print(response.choices[-1].text)
k = f"Context:{p} \n Now please complete the following code in java: \n"

file = open('story.txt', 'r')
for line in file:
    k+= line
response = openai.Completion.create(
    model="text-davinci-003",
    prompt=k,
    temperature=0.7,
    max_tokens=256,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
)

print(response.choices[-1].text)
