import React, { FC } from "react";
import { Field as FField, Form as FinalForm } from "react-final-form";
import FormStateToRedux from "../../../utils/FormStateToRedux";
import { Button, Typography } from "@material-ui/core";

const fields = [
  {
    title: "Union Status",
    value: ["Non-Union", "AEA", "AEA-EMC", "Other"],
    category: "unions",
    searchOnly: false
  },
  {
    title: "Gender",
    value: ["Female", "Male", "Non-Binary", "Other"],
    category: "gender",
    searchOnly: false
  },
  {
    title: "Age",
    value: [
      "Child",
      "Teen",
      "Teens-20",
      "20s-30s",
      "30s-40s",
      "40s-50s",
      "50s-60s",
      "60s-70s",
      "Over 70"
    ],
    category: "ageRange",
    searchOnly: false
  },
  {
    title: "Ethnicity",
    value: [
      "African American",
      "Asian",
      "Caucasian",
      "Hispanic",
      "Latino",
      "Native American",
      "Alaskan Native",
      "Hawaiian",
      "Middle Eastern",
      "North African",
      "Multi-Cultural"
    ],
    category: "ethnicity",
    searchOnly: false
  },
  {
    title: "Voice Type",
    value: [
      "Soprano",
      "Mezzo Soprano Belter",
      "Mezzo Soprano",
      "Alto",
      "Tenor",
      "Baritenor",
      "Baritone",
      "Bass"
    ],
    category: "vocalRange",
    searchOnly: false
  },
  {
    title: "Eye Color",
    value: [
      "Brown",
      "Hazel",
      "Blue",
      "Green",
      "Gray",
      "Amber",
      "Other",
      "Unknown"
    ],
    category: "eyeColor",
    searchOnly: true
  },
  {
    title: "Hair Color",
    value: ["Brown", "Black", "Red", "Blonde", "Other", "Unknown"],
    category: "hairColor",
    searchOnly: true
  }
];

const SmartCheckbox: FC<any> = ({ category, option }) => (
  <label className="m-1">
    <FField name={category} component="input" type="checkbox" value={option} />{" "}
    {option}
  </label>
);
const FormRender: FC<any> = props => (
  <form onSubmit={props.handleSubmit}>
    <FormStateToRedux form="talentSpecs" />
    {fields
      .filter(f => props.search || !f.searchOnly)
      .map(field => (
        <div className="spec-container" key={field.title}>
          <Typography variant={"h6"}>{field.title}</Typography>
          <div className="spec-checkboxes flex flex-wrap">
            {field.value.map(option => (
              <SmartCheckbox
                key={option}
                option={option}
                category={field.category}
              />
            ))}
          </div>
        </div>
      ))}
    {props.button ? (
      <Button
        variant="contained"
        color="primary"
        className={"float-right m-1"}
        type="submit"
      >
        Submit
      </Button>
    ) : null}
  </form>
);

export const TalentSpecificationsForm: FC<any> = ({
  search,
  button,
  breakdown = {},
  onSubmit = () => {}
}) => {
  console.log("talent spec");
  return (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={breakdown}
      subscription={{ submitting: true, pristine: true }}
      render={p => <FormRender button={button} search={search} {...p} />}
    />
  );
};

export default TalentSpecificationsForm;
