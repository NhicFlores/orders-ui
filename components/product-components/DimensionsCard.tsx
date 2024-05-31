import {
  fractionRange,
  inchRange,
} from "@/lib/data/product-placeholder-data";
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
import { useState } from "react";

// shape {name: string, dimensions: {width: {label: string, options: string[]}, height: {label: string, options: string[]}, thickness: {label: string, options: string[]}}
// for each element in dimensions, render a select with options
// then that drop down is changed, pass the dimension label and value to function 
// function will create an object with all dimensions and values and pass it to summary card casted 'as Dimension'
interface DimensionCardProps {
  handleSelection: (dimensionString: string, thickness: string) => void;
}

interface Dimension {
  base?: string;
  height?: string;
  left_sub_height?: string;
  right_sub_height?: string;
  top?: string;
  left_projection?: string;
  right_projection?: string;
}
//any shapes that don't have these, will define their own dimensions interface 

const DimensionsCard = ({ handleSelection }: DimensionCardProps) => {
  // NOTE TODO: each shape needs to have required dimensions associated with it
  //each dimension needs label and options array
  const dimensionArray = ["Width", "Height"];

  // dimension object will have all possible dimensions 
  // {width: {label: "Width", options: ["1", "2", "3"]}, height: {label: "Height", options: ["1", "2", "3"]}}
 // summary card will display only non-null values

  const [dimensions, setDimensions] = useState();
  function formatDimensionString() {}

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Square</CardTitle>
        <CardDescription>
          Enter height and width: all units are in inches
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div>
          <Square width={200} height={200} />
        </div>
        <form className="space-y-6">
          {dimensionArray.map((dimension, index) => {
            return (
              <div className="space-y-2" key={index}>
                <Label htmlFor={dimension}>{dimension} (inches)</Label>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger id={dimension}>
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {inchRange.map((value, index) => (
                        <div key={index}>
                          <SelectItem value={value as unknown as string}>
                            {value}
                          </SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
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
          <div className="space-y-2">
            <Label>Thickness (inches)</Label>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger id="thickness">
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
          <div className="flex justify-between">
            <Button variant="outline">Back</Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DimensionsCard;
