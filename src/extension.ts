import * as vscode from "vscode";

import * as fs from "fs";
import {
  componentFileTemplate,
  indexFileTemplate,
  styledFileTemplate,
  typeFileTemplate,
} from "./template/fileTemplate";

const extensionName = "createComponent";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    extensionName,
    async (uri) => {
      let path;

      if (uri) {
        path = uri.path;
      } else {
        if (vscode.workspace.workspaceFolders) {
          path = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
      }

      if (!path) {
        vscode.window.showInformationMessage("Please try again.");
        return;
      }

      const workspaceConfig =
        vscode.workspace.getConfiguration("createComponent");

      const isUseArrowFunction = workspaceConfig.get("useArrowFunction", true);
      const isUseStyleFile = workspaceConfig.get("useStyleFile", true);
      const isUseTypeFile = workspaceConfig.get("useTypeFile", false);
      const isIncludeComponentName = workspaceConfig.get(
        "includeComponentName",
        false
      );

      const componentName = await vscode.window.showInputBox({
        placeHolder: "Component Name",
        validateInput(value) {
          if (!value) {
            return "Please enter a component name.";
          }
        },
      });

      if (componentName) {
        const componentPath = `/${path}/${componentName}`;

        if (!fs.existsSync(componentPath)) {
          fs.mkdirSync(componentPath);

          const filePath = {
            component: `${componentPath}/${componentName}.tsx`,
            index: `${componentPath}/index.ts`,
            style: `${componentPath}/${
              isIncludeComponentName ? `${componentName}.styled` : "styled"
            }.ts`,
            type: `${componentPath}/${
              isIncludeComponentName ? `${componentName}.type` : "type"
            }.ts`,
          };

          fs.writeFileSync(filePath.index, indexFileTemplate(componentName));
          fs.writeFileSync(
            filePath.component,
            componentFileTemplate(
              componentName,
              isIncludeComponentName,
              isUseTypeFile,
              isUseStyleFile,
              isUseArrowFunction
            )
          );

          if (isUseStyleFile) {
            fs.writeFileSync(filePath.style, styledFileTemplate());
          }

          if (isUseTypeFile) {
            fs.writeFileSync(filePath.type, typeFileTemplate(componentName));
          }

          vscode.window.showInformationMessage(`Success Create Component`);
        } else {
          vscode.window.showInformationMessage(
            `Folder with the same name exists`
          );
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
