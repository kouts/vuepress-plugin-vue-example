## Config

#### componentsDir

- Type: `string`
- Default: `null`

The folder in which all the example `.vue` components are stored.  
Either an absolute path or a relative path to the `.vuepress/.temp` directory can be used.  
It may contain sub-folders for better organization.

## Props

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Prop</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>component</td>
      <td>The component name of the example component <strong>without</strong> the .vue extension</td>
      <td>String</td>
      <td><em>Empty</em></td>
      <td>false</td>
    </tr>
    <tr>
      <td>title</td>
      <td>Custom title for the example</td>
      <td>String</td>
      <td>Example</td>
      <td>false</td>
    </tr>
    <tr>
      <td>stripComments</td>
      <td>Controls whether comments should be removed from the example's code</td>
      <td>Boolean</td>
      <td>true</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showLabels</td>
      <td>Controls whether to show labels on the sections' tabs</td>
      <td>Boolean</td>
      <td>true</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showIcons</td>
      <td>Controls whether to show icons on the sections' tabs</td>
      <td>Boolean</td>
      <td>true</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showLoader</td>
      <td>Controls whether to show a loader spinner while the example component is loading</td>
      <td>Boolean</td>
      <td>false</td>
      <td>false</td>
    </tr>
    <tr>
      <td>startExpanded</td>
      <td>Controls whether the main section should be expanded upon initialization</td>
      <td>Boolean</td>
      <td>true</td>
      <td>false</td>
    </tr>          
  </tbody>
</table>

## Slots

### default

The default slot to use for adding content inside the live example section.

### template

The slot to use for adding content inside the template section.

### script

The slot to use for adding content inside the script section.

### style

The slot to use for adding content inside the style section.
