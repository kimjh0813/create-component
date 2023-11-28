const componentName = () => {
  return;
};

const indexFileTemplate = (componentName: string) => {
  const content = `export { default } from "./${componentName}"`;

  return content;
};

const componentFileTemplate = (
  componentName: string,
  isIncludeComponentName: boolean,
  isUseTypeFile: boolean
) => {
  const content = `import * as S from "./${
    isIncludeComponentName ? `${componentName}.styled` : "styled"
  }";
${
  isUseTypeFile
    ? `import * as T from "./${
        isIncludeComponentName ? `${componentName}.type` : "type"
      }";`
    : `\ninterface ${componentName}Props {}`
}
\nconst ${componentName} = ({}: ${
    isUseTypeFile ? `T.${componentName}` : componentName
  }Props) => {
  return (
    <S.Container>${componentName}</S.Container>    
  );
};
  
export default ${componentName};`;

  return content;
};

const styledFileTemplate = () => {
  const content = `import styled from "styled-components";

export const Container = styled.div\`\`;`;

  return content;
};

const typeFileTemplate = (componentName: string) => {
  const content = `export interface ${componentName}Props {}`;

  return content;
};

export {
  indexFileTemplate,
  componentFileTemplate,
  styledFileTemplate,
  typeFileTemplate,
};
