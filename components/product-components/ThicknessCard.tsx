"use client";
import { fractionRange } from "@/lib/data/product-placeholder-data";
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
import { DimensionRoute, TintRoute } from "@/routes";
import Link from "next/link";

/**
 * @typedef {Object} ThicknessCardProps
 * @property {(thickness: string) => void} handleSelection
 *
 */
interface ThicknessCardProps {
  handleSelection: (thickness: string) => void;
}

const ThicknessCard = ({ handleSelection }: ThicknessCardProps) => {
  function handleValueChange(value: string) {
    handleSelection(value);
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Thickness Card</CardTitle>
        <CardDescription>
          Enter height and width: all units are in inches
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div>
          <Square width={200} height={200} />
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label>Thickness (inches)</Label>
            <div className="flex space-x-2">
              <Select onValueChange={(value) => handleValueChange(value)}>
                <SelectTrigger id="thickness">
                  <SelectValue
                    placeholder={
                      <div className="text-muted-foreground">1/8</div>
                    }
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
          <div className="flex justify-between pb-4">
            <Link href={DimensionRoute.href}>
              <Button variant="outline">Back</Button>
            </Link>
            <Link href={TintRoute.href}>
              <Button type="button">Continue</Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ThicknessCard;
