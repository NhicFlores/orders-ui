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
import {
  Shape,
} from "@/lib/definitions/order-item-definitions";
import { useState } from "react";

/**
 * @typedef {Object} DimensionCardProps
 * @property {Shape} shape
 * @property {(dimensionString: string) => void} handleSelection
 *
 */
interface DimensionCardProps {
  shape: Shape;
  handleSelection: (dimensionString: string) => void;
}

interface Dimension {
  label: string;
  wholeNumber: string;
  fraction: string;
}

const DimensionsCard = ({
  shape: { id, name, required_dimensions },
  handleSelection,
}: DimensionCardProps) => {
  const inchStrings = inchRange.map((value) => value.toString());

  // state to watch for changes in dropdown inputs
  const [ dimensions, setDimensions ] = useState<Dimension[]>([
    { label: "Base", wholeNumber: "", fraction: "" },
    { label: "Height", wholeNumber: "", fraction: "" },
  ]);

  let reqDimensions = [];

  reqDimensions = [
    { label: "Width", value: "" },
    { label: "Height", value: "" },
  ];

  function handleDimensionChange(label: string, value: string) {
    handleSelection(`${label}: ${value}`);
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
                <Label htmlFor={dimension.label}>
                  {dimension.label} (inches)
                </Label>
                <div className="flex space-x-2">
                  <Select
                    onValueChange={(value) =>
                      handleDimensionChange(dimension.label, value)
                    }
                  >
                    <SelectTrigger id={dimension.label}>
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
                      handleDimensionChange(dimension.label, value)
                    }
                  >
                    <SelectTrigger id={dimension.label}>
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
            <Button type="submit">
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DimensionsCard;
