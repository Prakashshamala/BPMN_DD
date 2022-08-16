import entryFactory from "bpmn-js-properties-panel/lib/factory/EntryFactory";
let getBusinessObject = require("bpmn-js/lib/util/ModelUtil").getBusinessObject;
import cmdHelper from "bpmn-js-properties-panel/lib/helper/CmdHelper";
import { is } from "bpmn-js/lib/util/ModelUtil";
import $ from "jquery";

export default function (group, element, translate) {
  if (is(element, "bpmn:Task")) {
    group.entries.push(
      entryFactory.selectBox(translate, {
        id: "spell",
        description: "Apply a black magic spell",
        label: "Spell",
        modelProperty: "spell",
        selectOptions: function (element, node) {
          let arrValues = [];
          $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "GET",
            dataType: "json",
            success: function (result) {
              result.forEach((element) =>
                arrValues.push({
                  label: element.name,
                  name: element.name,
                  value: element.id
                })
              );
            },
            error: function (jqXHR, textStatus, errorThrown) {},
            async: false
          });
          return arrValues;
        },
        setControlValue: true
      })
    );
  }
}
