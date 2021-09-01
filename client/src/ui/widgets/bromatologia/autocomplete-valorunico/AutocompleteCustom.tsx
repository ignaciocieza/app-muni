/* eslint-disable no-use-before-define */
//@ts-nocheck
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { FormikErrors } from "formik";

/**
 * https://material-ui.com/components/autocomplete/#checkboxes
 * @param param0
 */
export default function AutocompleteCustom({
  options,
  error,
  className,
  setFieldValue,
  setOnChange,
  values,
  fieldName,
  isCanAdd,
}: {
  options: string[];
  error?:
    | string
    | FormikErrors<any>
    | string[]
    | FormikErrors<any>[]
    | undefined;
  className?: string | undefined;
  setFieldValue?: (fieldName: string, newEvent: any, bool: boolean) => void;
  values: string | string[];
  fieldName: string;
  setOnChange?: any;
  isCanAdd?: boolean;
}) {
  const othersProps = {};
  const filter = createFilterOptions();

  if (isCanAdd) {
    othersProps["selectOnFocus"] = true;
    othersProps["clearOnBlur"] = true;
    othersProps["handleHomeEndKeys"] = true;
    othersProps["freeSolo"] = true;
    othersProps["filterOptions"] = (options, params) => {
      const filtered = filter(options, params);

      // Suggest the creation of a new value
      if (params.inputValue !== "" && !filtered.length) {
        filtered.push(`Agregar: ${params.inputValue}`);
      }

      return filtered;
    };
  }
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      //disableCloseOnSelect
      //getOptionLabel={(option) => option}
      defaultValue={
        values ? values?.map?.((item) => item) ?? [values] : undefined
      }
      filterSelectedOptions
      onChange={(event, newEvent) => {
        if (!!setFieldValue) {
          if (isCanAdd) {
            console.log([
              `${newEvent[0]?.replace?.("Agregar:", "").trim().toUpperCase()}`,
            ]);
            setFieldValue(
              fieldName,
              [
                `${newEvent[0]
                  ?.replace?.("Agregar:", "")
                  .trim()
                  .toUpperCase()}`,
              ],
              true
            );
          } else {
            setFieldValue(fieldName, newEvent, true);
          }
        } else {
          setOnChange(newEvent);
        }
      }}
      className={className}
      // classes={{
      //   tag: classes.paper,
      // }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          error={!!error}
          helperText={error}
        />
      )}
      {...othersProps}
    />
  );
}
