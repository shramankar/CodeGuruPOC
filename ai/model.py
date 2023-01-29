import json
import requests
import os
import openai

openai.api_key = "API_KEY"


p = "Provide a summary of what is expected to be completed:"
file = open('title.txt', 'r')
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
k = f"Contex: {p}: Now please complete the following code in the spring framework: \n"

file = open('story.txt', 'r')
for line in file:
    k += line
response = openai.Completion.create(
    model="text-davinci-003",
    prompt=k,
    temperature=0.7,
    max_tokens=900,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
)
file = open("outputStory1.txt", "w")
file.write(response.choices[-1].text)
print(response.choices[-1].text)

k = f"Contex: {p}: Now please complete the following code in the spring framework: \n"

file = open('story2.txt', 'r')
for line in file:
    k += line
response = openai.Completion.create(
    model="text-davinci-003",
    prompt=k,
    temperature=0.7,
    max_tokens=900,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
)
file = open("outputStory2.txt", "w")
file.write(response.choices[-1].text)
print(response.choices[-1].text)


k = f"Contex: {p}: Now please complete the following code in the spring framework: \n"

file = open('story3.txt', 'r')
for line in file:
    k += line
response = openai.Completion.create(
    model="text-davinci-003",
    prompt=k,
    temperature=0.7,
    max_tokens=900,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
)
file = open("outputStory3.txt", "w")
file.write(response.choices[-1].text)
print(response.choices[-1].text)


# GitHub API access token
access_token = "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"

# repository name and owner
repo_name = "mycodeguru"
owner = "shramankar"

# file path and content
file_path = "outputStory1.txt"
with open(file_path, "r") as file:
    file_content = file.read()

# create a new file in the repository
url = f"https://api.github.com/repos/{owner}/{repo_name}/contents/{file_path}"
headers = {
    "Authorization": f"token {access_token}",
    "Accept": "application/vnd.github+json"
}
data = {
    "message": "Uploading file",
    "content": file_content.encode("base64")
}
response = requests.put(url, headers=headers, json=data)

# check if the file was successfully uploaded
if response.status_code == 201:
    print("File uploaded successfully!")
else:
    print(f"Error uploading file: {response.content}")
