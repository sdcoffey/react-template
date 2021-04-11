const _ = require("lodash");

const propName = (text) => `${_.upperFirst(text)}Props`;
const baseName = (text) => {
  text = _.replace(text, /^use/i, "");
  text = _.replace(text, /query$/i, "");
  text = _.replace(text, /mutation$/i, "");

  return text;
};

module.exports = (plop) => {
  plop.setHelper("propName", propName);

  plop.setGenerator("component", {
    description: "component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name of the component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.scss",
        templateFile: "templates/cssmodule.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/componentindex.hbs",
      },
      {
        type: "add",
        path: "src/stories/{{pascalCase name}}.stories.tsx",
        templateFile: "templates/component-story.hbs",
      },
      {
        type: "append",
        path: "src/components/index.ts",
        pattern: "// $Components",
        template: `export { {{ pascalCase name }}, {{ propName name }} } from "./{{ pascalCase name }}";`
      },
    ],
  });
};
