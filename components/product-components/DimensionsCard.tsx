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
import Link from "next/link";
import { GlassThicknessRoute } from "@/routes";
import { RequiredDimensionsSchema } from "@/schema/form-schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [dimensions, setDimensions] = useState<Dimension[]>(
    required_dimensions
      ? required_dimensions
      : [
          { label: "Base", wholeNumber: "1", fraction: "1/4" },
          { label: "Height", wholeNumber: "1", fraction: "1/4" },
        ]
  );
  // this array is used to render the dropdowns
  // might be unnecessary if it doesn't save any renders
  // compared to using the required_dimensions directly
  let reqDimensions = dimensions.map((dimension) => {
    return dimension.label;
  });

  // console.log("--------- useEffect: Dimensions ---------")
  // console.log(dimensions);
  const DimensionSchema = z.object(
    Object.fromEntries(
      dimensions.map((dimension) => [
        dimension.label,
        z.object({
          label: z.string(),
          wholeNumber: z.string().min(1),
          fraction: z.string().min(1),
        }),
      ])
    )
  )

  function handleDimensionChange(
    label: string,
    value: string,
    isFraction: boolean
  ) {
    // console.log("X--------- handleDimensionChange: Previous Dimensions ---------X")
    // console.log(dimensions);
    // console.log("X--------- handleDimensionChange: Values from onValueChange ---------X")
    // console.log(label, value, isFraction);
    setDimensions((prev) => {
      const updatedDimensions = prev.map((dimension) =>
        dimension.label === label
          ? isFraction
            ? { ...dimension, fraction: value }
            : { ...dimension, wholeNumber: value }
          : dimension
      );
      console.log("X--------- setDimensions: Updated Dimensions ---------X");
      console.log(updatedDimensions);
      return updatedDimensions;
    });
  }

  useEffect(() => {
    console.log("X-------- useEffect: Dimensions --------X");
    console.log(dimensions);
    let dimensionStrings = dimensions.map(
      ({ label, wholeNumber, fraction }) =>
        `${label}: ${wholeNumber} ${fraction}`
    );
    // console.log(dimensionStrings.join(" x "));
    handleSelection(dimensionStrings.join(" x "));
  }, [dimensions, handleSelection]);

  // function handleSave() {
  //   console.log(dimensions);

  //   // const updatedDimensions = dimensions.map(dimension => {
  //   //   if(!dimension.wholeNumber){
  //   //     dimension.wholeNumber = "1";
  //   //   }
  //   //   if(!dimension.fraction){
  //   //     dimension.fraction = "1/4";
  //   //   }
  //   //   return dimension;
  //   // })

  //   // setDimensions(updatedDimensions);

  // }

  function onSubmit(data: z.infer<typeof RequiredDimensionsSchema>) {

  }
  // onSubmit={form.handleSubmit}
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
        <form className="space-y-6" >
          {reqDimensions.map((dimension, index) => {
            return (
              <div className="space-y-2" key={index}>
                <Label htmlFor={dimension}>{dimension} (inches)</Label>
                <div className="flex space-x-2">
                  <Select
                    onValueChange={(value) =>
                      handleDimensionChange(dimension, value, false)
                    }
                  >
                    <SelectTrigger id={dimension}>
                      <SelectValue
                        placeholder={<p className="text-muted-foreground">1</p>}
                      />
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
                      <SelectValue
                        placeholder={
                          <p className="text-muted-foreground text-lg">½</p>
                        }
                        className=""
                      />
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
            <Link href={GlassThicknessRoute.href}>
              <Button type="button">Continue</Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DimensionsCard;
