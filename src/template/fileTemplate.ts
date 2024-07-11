const indexFileTemplate = (
  componentName: string,
  isUseDefaultExport: boolean
) => {
  const content = `export ${
    isUseDefaultExport ? "{ default }" : "*"
  } from './${componentName}';\n`;

  return content;
};

const componentFileTemplate = (
  componentName: string,
  isIncludeComponentName: boolean,
  isUseTypeFile: boolean,
  isUseStyleFile: boolean,
  isUseArrowFunction: boolean,
  isUseDefaultExport: boolean
) => {
  const tagName = isUseStyleFile ? "S.Container" : "div";

  const content = `${
    isUseStyleFile
      ? `import * as S from './${
          isIncludeComponentName ? `${componentName}.styled` : "styled"
        }';\n`
      : ""
  }${
    isUseTypeFile
      ? `import * as T from './${
          isIncludeComponentName ? `${componentName}.type` : "type"
        }';`
      : `${isUseStyleFile ? "\n" : ""}interface ${componentName}Props {}`
  }
\n${
    isUseArrowFunction
      ? `${!isUseDefaultExport ? "export " : ""}const ${componentName} = ({}: ${
          isUseTypeFile ? `T.${componentName}` : componentName
        }Props) => {`
      : `export ${
          isUseDefaultExport ? "default " : ""
        }function ${componentName}({}: ${
          isUseTypeFile ? `T.${componentName}` : componentName
        }Props) {`
  }
  return <${tagName}>${componentName}</${tagName}>;
}${
    isUseArrowFunction && isUseDefaultExport
      ? `\n\nexport default ${componentName};\n`
      : "\n"
  }`;

  return content;
};

const styledFileTemplate = () => {
  const content = `import styled from 'styled-components';

export const Container = styled.div\`\`;\n`;

  return content;
};

const typeFileTemplate = (componentName: string) => {
  const content = `export interface ${componentName}Props {}\n`;

  return content;
};

export {
  indexFileTemplate,
  componentFileTemplate,
  styledFileTemplate,
  typeFileTemplate,
};
