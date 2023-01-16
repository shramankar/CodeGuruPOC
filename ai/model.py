import os
import openai

openai.api_key = "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"


p = "Write Java code to "
file = open('story.txt', 'r')
for line in file:
    p += line
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
