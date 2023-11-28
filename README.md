# createcomponent README

After right-clicking in the Explorer, select 'Create Component' from the menu, then enter the name in the input field to generate the component.


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
