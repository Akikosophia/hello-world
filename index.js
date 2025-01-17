

var jason = {"kleuren": "pink"};

console.log(jason)

var data = {
    "categories": [
      {
        "name": "Audit",
        "subcategories": [
          {
            "name": "Financial Review",
            "prompts": [
              {
                "id": 1,
                "label": "Quarterly Financial Statement Review",
                "text": "As an experienced auditor, you are tasked with thoroughly reviewing the quarterly financial statements to ensure accuracy and compliance with regulatory standards. Please upload the {{ Financial Statement File }} for further analysis, indicate the {{ Review Date }}, and assign the task to the {{ Lead Auditor }}.",
                "variables": [
                  {
                    "type": "file",
                    "label": "Financial Statement File"
                  },
                  {
                    "type": "date",
                    "label": "Review Date"
                  },
                  {
                    "type": "text",
                    "label": "Lead Auditor"
                  }
                ]
              }
            ]
          },
          {
            "name": "Compliance Check",
            "prompts": [
              {
                "id": 2,
                "label": "Operations Compliance Verification",
                "text": "Your responsibility is to verify the compliance of our recent operations with industry standards and regulations. Enter the date of the last compliance review in the field provided: {{ Last Compliance Review Date }}, name the responsible {{ Compliance Officer }}, and upload the {{ Compliance Document }} for record-keeping.",
                "variables": [
                  {
                    "type": "date",
                    "label": "Last Compliance Review Date"
                  },
                  {
                    "type": "text",
                    "label": "Compliance Officer"
                  },
                  {
                    "type": "file",
                    "label": "Compliance Document"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Innovation",
        "subcategories": [
          {
            "name": "Product Development",
            "prompts": [
              {
                "id": 3,
                "label": "New Product Features Outline",
                "text": "As the leader of the product development team, you are required to outline the main features and unique selling points of our new product. Provide a detailed description in the text area below: {{ Product Features }}, select the {{ Target Market }} for our product, and specify the estimated cost of development: €{{ Estimated Cost }}.",
                "variables": [
                  {
                    "type": "textarea",
                    "label": "Product Features"
                  },
                  {
                    "type": "text",
                    "label": "Target Market"
                  },
                  {
                    "type": "number",
                    "label": "Estimated Cost"
                  }
                ]
              },
              {
                "id": 4,
                "label": "Product Launch Planning",
                "text": "Determine and select a target launch date for the new product. This date will help us plan our marketing and distribution strategies. Choose the date in the field below: {{ Launch Date }}, set a marketing budget of: €{{ Marketing Budget }}, and assign the {{ Project Manager }} to oversee the launch.",
                "variables": [
                  {
                    "type": "date",
                    "label": "Launch Date"
                  },
                  {
                    "type": "number",
                    "label": "Marketing Budget"
                  },
                  {
                    "type": "text",
                    "label": "Project Manager"
                  }
                ]
              }
            ]
          },
          {
            "name": "Market Research",
            "prompts": [
              {
                "id": 5,
                "label": "Customer Survey and Analysis",
                "text": "To better understand our customers' needs, you are to conduct a comprehensive survey. After gathering the data, upload the survey results for analysis: {{ Survey Results }}, enter the {{ Survey Completion Date }}, and name the {{ Survey Coordinator }} responsible for this project.",
                "variables": [
                  {
                    "type": "file",
                    "label": "Survey Results"
                  },
                  {
                    "type": "date",
                    "label": "Survey Completion Date"
                  },
                  {
                    "type": "text",
                    "label": "Survey Coordinator"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Consulting",
        "subcategories": [
          {
            "name": "Document Processing",
            "prompts": [
              {
                "id": 6,
                "label": "Client Project Outcome Report",
                "text": "Prepare a detailed report on the outcomes of the client project. Your report should cover all significant findings and insights. Enter your main findings in the text area below: {{ Main Findings }}, upload all relevant {{ Supporting Documents }}, and specify the {{ Report Submission Date }}.",
                "variables": [
                  {
                    "type": "textarea",
                    "label": "Main Findings"
                  },
                  {
                    "type": "file",
                    "label": "Supporting Documents"
                  },
                  {
                    "type": "date",
                    "label": "Report Submission Date"
                  }
                ]
              }
            ]
          },
          {
            "name": "Client Meetings",
            "prompts": [
              {
                "id": 7,
                "label": "Schedule Client Follow-up Meeting",
                "text": "To ensure effective follow-up with the client, schedule a follow-up meeting. Provide the preferred date and time using the input field below: {{ Meeting Date and Time }}, outline the {{ Meeting Agenda }}, and include the {{ Client Contact Information }} for communication.",
                "variables": [
                  {
                    "type": "datetime-local",
                    "label": "Meeting Date and Time"
                  },
                  {
                    "type": "textarea",
                    "label": "Meeting Agenda"
                  },
                  {
                    "type": "text",
                    "label": "Client Contact Information"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
};
  
console.log(data["categories"][0]["subcategories"][0]["prompts"][0]["id"])

console.log(data)

var akiko = [11,4]

console.log(akiko[0])


// express server die deze json returned: {"kleuren": "pink"}
// endpoint is op: /

const express = require('express')
const app = express()
const file = require('./info.json');
const city = require('./current.city.list.json');


console.log(file.categories[0].subcategories[0].prompts)

// console.log(city)

// Stel ejs in als template engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

async function fetchAnything(url, payload) {
  const response = await fetch(url, payload);
  const json = await response.json();
  return json;
}

app.get('/', async (req, res) => {
  const url = 'https://fdnd-agency.directus.app/items/deloitte_prompts';
  const prompts_from_api = await fetchAnything(url, {});
  console.log(prompts_from_api);
  res.render('pages/home',{
        prompts: prompts_from_api["data"]
        // prompts: prompts_from_api.data
        // prompts: file.categories[0].subcategories[0].prompts
  });
});


  


// app.get('/head', (req, res) => {
//     res.render(data["categories"][0]["subcategories"][0]["prompts"][0]);
// });

app.listen(3000)
