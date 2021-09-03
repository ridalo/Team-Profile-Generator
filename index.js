const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "index.html");

const render = require("./lib/RendererHtml");
const Choices = require("inquirer/lib/objects/choices");

let employeeRoster = [];

const managerQuestion = [
  {
    type: "input",
    name: "managername",
    message: "What is the manager's name?",
    validate: (managernameInput) => {
      if (managernameInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter A Manager!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "managerid",
    message: "What is the manager's id number?",
    validate: (manageridInput) => {
      if (manageridInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter an ID number!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "manageremail",
    message: "What is the manager's email?",
    validate: (manageremailInput) => {
      if (manageremailInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter an email!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "officenumber",
    message: "What is the manager's office number?",
    validate: (officenumberInput) => {
      if (officenumberInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter an office number!");
        return false;
      }
    },
  },
];

const engineerQuestion = [
  {
    type: "input",
    name: "engineername",
    message: "What is the engineer's name?",
    validate: (engineernameInput) => {
      if (engineernameInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter an engineer name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "engineerid",
    message: "What is the engineer's id number?",
    validate: (engineeridInput) => {
      if (engineeridInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter an ID number!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "engineeremail",
    message: "What is the engineer's email?",
    validate: (engineeremailInput) => {
      if (engineeremailInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter an email!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "githubname",
    message: "What is the engineer's GitHub username?",
    validate: (githubnameInput) => {
      if (githubnameInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter GitHub username!");
        return false;
      }
    },
  },
];

const internQuestion = [
  {
    type: "input",
    name: "internname",
    message: "What is the intern's name?",
    validate: (internnameInput) => {
      if (internnameInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter inter's name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "internid",
    message: "What is the intern's id number?",
    validate: (internidInput) => {
      if (internidInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter inter ID number!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "internemail",
    message: "What is the intern's email?",
    validate: (internemailInput) => {
      if (internemailInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter intern's email!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "schoolname",
    message: "What school does the intern's attend?",
    validate: (schoolnameInput) => {
      if (schoolnameInput) {
        return true;
      } else {
        console.log("(Requierd) Please enter school intern is attending!");
        return false;
      }
    },
  },
];

const list = [
  {
    type: "list",
    name: "EmployeeType",
    choices: ["Engineer", "Intern", "Exit"],
    message: "Please select a new employee.",
  },
];

const promptSelection = () => {
  inquirer.prompt(list).then((answer) => {
    switch (answer.EmployeeType) {
      case "Engineer":
        promptEngineer();
        break;
      case "Intern":
        promptIntern();
        break;
      default:
        generateHtml();
    }
  });
};

const promptEngineer = () => {
  inquirer.prompt(engineerQuestion).then((answer) => {
    employeeRoster.push(
      new Engineer(
        answer.engineername,
        answer.engineerid,
        answer.engineeremail,
        answer.githubname
      )
    );
    promptSelection();
  });
};

const promptIntern = () => {
  inquirer.prompt(internQuestion).then((answer) => {
    employeeRoster.push(
      new Intern(
        answer.internname,
        answer.internid,
        answer.internemail,
        answer.schoolname
      )
    );
    promptSelection();
  });
};

const generateHtml = () => {
  fs.writeFile(outputPath, render(employeeRoster), (err) => {
    if (err) throw err;
    console.log("File saved at " + outputPath);
  });
};

//promptSelection();

const mainPrompt = () => {
  inquirer.prompt(managerQuestion).then((answer) => {
    employeeRoster.push(
      new Manager(
        answer.managername,
        answer.managerid,
        answer.manageremail,
        answer.officenumber
      )
    );
    promptSelection();
  });
};

mainPrompt();