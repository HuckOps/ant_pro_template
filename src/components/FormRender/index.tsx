import { Checkbox, DatePicker, Form, Input, Radio } from "antd";
import { Rule } from "antd/es/form";
import React, { ReactElement } from "react";
import { CheckboxItem, RadioItem } from "./typings";

const { RangePicker } = DatePicker;

export interface FormItems {
  type: "Input" | "Checkbox" | "DatePicker" | "RangePicker" | "Radio";
  label: string;
  name: string;
  rules?: Rule[];
  items?: CheckboxItem[] | RadioItem[];
  elementAttribute?: object;
}

export interface FormRenderProps {
  items: FormItems[];
  initialValues?: object;
  labelCol?: object;
  wrapperCol?: object;
}

export default function (props: FormRenderProps) {
  const renderElement = (item: FormItems): ReactElement | undefined => {
    switch (item.type) {
      case "Input":
        return <Input {...item.elementAttribute} />;
      case "Checkbox":
        return (
          <Checkbox.Group
            options={item.items as CheckboxItem[]}
            {...item.elementAttribute}
          />
        );
      case "DatePicker":
        return <DatePicker {...item.elementAttribute} />;
      case "RangePicker":
        return <RangePicker {...item.elementAttribute} />;
      case "Radio":
        return (
          <Radio.Group>
            {(item.items as RadioItem[])?.map((i) => (
              <Radio value={i.value}>{i.label}</Radio>
            ))}
          </Radio.Group>
        );
      default:
        return undefined;
    }
  };
  return (
    <Form
      initialValues={props?.initialValues}
      labelCol={props?.labelCol}
      wrapperCol={props?.wrapperCol}
    >
      {props.items.map((item) => {
        return (
          <Form.Item label={item.label} name={item.name} rules={item.rules}>
            {renderElement(item)}
          </Form.Item>
        );
      })}
    </Form>
  );
}
