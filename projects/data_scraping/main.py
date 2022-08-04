import requests
from bs4 import BeautifulSoup
from pandas import DataFrame

URL = "https://realpython.github.io/fake-jobs/"
resp = requests.get(URL)

soup = BeautifulSoup(resp.content, "html.parser")
results = soup.find(id="ResultsContainer")

job_elements = results.find_all("div", class_="card-content")

titles = []
companies = []
locations = []

for j in job_elements:
    title_element = j.find("h2", class_="title")
    company_element = j.find("h3", class_="company")
    location_element = j.find("p", class_="location")
    titles.append(title_element.text)
    companies.append(company_element.text)
    locations.append(location_element.text.strip())
     
df = DataFrame({'Title': titles, 'Companies': companies, 'Locations': locations})
df.to_excel('test.xlsx', sheet_name='sheet1', index=False)
