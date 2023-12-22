# createcomponent README

Create with react + styled-component

After right-clicking in the Explorer, select 'Create Component' from the menu, then enter the name in the input field to generate the component.

![gif import failed](https://github.com/kimjh0813/create-component/blob/main/public/react-create-component.gif?raw=true)

In your `settings.json` file, you can add the following configuration for customizing component creation:

| Setting              | Description                                              | Default Value |
|----------------------|----------------------------------------------------------|---------------|
| `useTypeFile`        | It determines whether to include a separate Type file (type.ts) for the component props definitions. | `false`       |
| `includeComponentName`| Deciding whether to include the component name in the filenames of styled and type files. | `false` |

### Example:

```json
{
  "createComponent": {
    "useTypeFile": true,
    "includeComponentName": true
  }
}
