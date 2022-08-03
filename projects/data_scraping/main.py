import requests
from bs4 import BeautifulSoup

URL = "https://realpython.github.io/fake-jobs/"
resp = requests.get(URL)

soup = BeautifulSoup(resp.content, "html.parser")
results = soup.find(id="ResultsContainer")

job_elements = results.find_all("div", class_="card-content")

for j in job_elements:
    title_element = j.find("h2", class_="title")
    company_element = j.find("h3", class_="company")
    location_element = j.find("p", class_="location")
    print(title_element.text)
    print(company_element.text)
    print(location_element.text.strip())
    print("\n")
