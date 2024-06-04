import { fractionRange, inchRange } from "@/lib/data/product-placeholder-data";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Square } from "lucide-react";
import { Dimension, Shape } from "@/lib/definitions/order-item-definitions";
import { useEffect, useState } from "react";

/**
 * @typedef {Object} DimensionCardProps
 * @property {Shape} Shape
 * @property {(dimensionString: string) => void} handleSelection
 *
 */
interface DimensionCardProps {
  shape: Shape;
  handleSelection: (dimensionString: string) => void;
}

const DimensionsCard = ({
  shape: { id, name, required_dimensions },
  handleSelection,
}: DimensionCardProps) => {
  const inchStrings = inchRange.map((value) => value.toString());

  // state to watch for changes in dropdown inputs
  // initialize dimensions state with required dimensions from shape 
  const [dimensions, setDimensions] = useState<Dimension[]>(required_dimensions ? required_dimensions : [
    { label: "Base", wholeNumber: "1", fraction: "1/2" },
    { label: "Height", wholeNumber: "1", fraction: "1/2" },
  ]);
  // this array is used to render the dropdowns 
  // might be unnecessary if it doesn't save any renders 
  // compared to using the required_dimensions directly 
  let reqDimensions = dimensions.map((dimension) => {
    return dimension.label;
  });

  // console.log("--------- useEffect: Dimensions ---------")
  // console.log(dimensions);

  function handleDimensionChange(
    label: string,
    value: string,
    isFraction: boolean
  ) {
    console.log("X--------- handleDimensionChange: Previous Dimensions ---------X")
    console.log(dimensions);
    console.log("X--------- handleDimensionChange: Values from onValueChange ---------X")
    console.log(label, value, isFraction);
    setDimensions((prev) => {
      const updatedDimensions = prev.map((dimension) => 
        dimension.label === label
          ? isFraction
            ? { ...dimension, fraction: value }
            : { ...dimension, wholeNumber: value }
          : dimension
        );
      console.log("X--------- setDimensions: Updated Dimensions ---------X")
      console.log(updatedDimensions);
      return updatedDimensions;
    });
  }

  useEffect(() => {
    console.log("X-------- useEffect: Dimensions --------X")
    console.log(dimensions);
    let dimensionStrings = dimensions.map(
      ({ label, wholeNumber, fraction }) => `${label}: ${wholeNumber} ${fraction}`
    );
    // console.log(dimensionStrings.join(" x "));
    handleSelection(dimensionStrings.join(" x "));
  }, [dimensions, handleSelection]);

  function handleSave() {
    console.log(dimensions);
    const dimensionStrings = dimensions.map(
      (dimension) => `${dimension.wholeNumber} ${dimension.fraction}`
    );
    console.log(dimensionStrings);
    handleSelection(dimensionStrings.join(" x "));
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          Enter height and width: all units are in inches
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div>
          <Square width={200} height={200} />
        </div>
        <form className="space-y-6">
          {reqDimensions.map((dimension, index) => {
            return (
              <div className="space-y-2" key={index}>
                <Label htmlFor={dimension}>
                  {dimension} (inches)
                </Label>
                <div className="flex space-x-2">
                  <Select
                    onValueChange={(value) =>
                      handleDimensionChange(dimension, value, false)
                    }
                  >
                    <SelectTrigger id={dimension}>
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {inchStrings.map((value, index) => (
                        <div key={index}>
                          <SelectItem value={value}>{value}</SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      handleDimensionChange(dimension, value, true)
                    }
                  >
                    <SelectTrigger id={dimension}>
                      <SelectValue placeholder="1/8" />
                    </SelectTrigger>
                    <SelectContent>
                      {fractionRange.map((value, index) => (
                        <div key={index}>
                          <SelectItem value={value}>{value}</SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between">
            <Button variant="outline">Back</Button>
            <Button type="button" onClick={handleSave}>Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DimensionsCard;
