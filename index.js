import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  VirtualScroll,
  Inject,
  Filter,
  Sort,
  Resize,
  Toolbar,
  Edit,
  CommandColumn,
} from '@syncfusion/ej2-react-treegrid';

const RowTemplate = () => {
  let [enableVirtualization, setVirtualization] = React.useState(true);
  const getDataSource = () => {
    let array = [],
      PARENTID = 0;
    for (let i = 0; i < 100000; i++) {
      let data = {
        VFUUID: i,
        NAME: `List item ${i}`,
        PARENTID: PARENTID,
      };
      if (i % 7 === 0) {
        data.hasChild = true;
        delete data.PARENTID;
        PARENTID = i;
      }

      array.push(data);
    }
    return array;
  };

  let dataSource = getDataSource();

  return (
    <div className="control-pane">
      <div className="control-section">
        {/* <label htmlFor="virtualization">
          <input
            type="checkbox"
            id="virtualization"
            defaultChecked
            onClick={() => {
              enableVirtualization = !enableVirtualization;
              setVirtualization(enableVirtualization);
            }}
          />
          <span> </span>
          Enable Virtualization
        </label> */}
        <TreeGridComponent
          ref={(scope) => (this.treeGrid = scope)}
          dataSource={dataSource}
          idMapping="VFUUID"
          parentIdMapping="PARENTID"
          allowSelection={true}
          autoCheckHierarchy={true}
          rowHeight={38}
          height="270"
          enableVirtualization={true}
        >
          <Inject
            services={[
              Filter,
              Sort,
              Resize,
              Toolbar,
              Edit,
              Selection,
              CommandColumn,
              VirtualScroll,
            ]}
          />
          <ColumnsDirective>
            <ColumnDirective
              showCheckbox={true}
              headerText="Task Name"
              width={100}
              field="NAME"
            ></ColumnDirective>
          </ColumnsDirective>
        </TreeGridComponent>
      </div>
    </div>
  );
};
export default RowTemplate;

const root = createRoot(document.getElementById('sample'));
root.render(<RowTemplate />);
