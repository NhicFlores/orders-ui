import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Square } from "lucide-react";

const DimensionsCard = () => {

    const rangeInInches = ["1", "2","3", "4","5", "6","7", "8",];
    const fractions = ['1/8', '5/32', '3/16', '1/4', '5/16', '3/8', '1/2', '5/8'];
    // NOTE TODO: each shape needs to have required dimensions associated with it 
    //each dimension needs label and options array 
  return (
    <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>Dimensions</CardTitle>
            <CardDescription>
                Enter dimensions: all units are in inches
            </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
            <div>
                <Square width={200} height={200}/>
            </div>
            <form className="space-y-6">     
                <div className="space-y-2">
                    <Label htmlFor="width">Width (inches)</Label>
                    <div className="flex space-x-2">
                        <Select>
                            <SelectTrigger id="width">
                                <SelectValue placeholder="1"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {rangeInInches.map((value, index) => (
                                    <div key={index}>
                                        <SelectItem value={value}>{value}</SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger id="width">
                                <SelectValue placeholder="1/8"/>
                            </SelectTrigger>
                            <SelectContent>
                                {fractions.map((value, index) => (
                                    <div key={index}>
                                        <SelectItem value={value}>{value}</SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div> 
                <div className="space-y-2">
                    <Label>Height (inches)</Label>
                    <div className="flex space-x-2">
                        <Select>
                            <SelectTrigger id="height">
                                <SelectValue placeholder="1"/>
                            </SelectTrigger>
                            <SelectContent>
                                {rangeInInches.map((value, index) => (
                                    <div key={index}>
                                        <SelectItem value={value}>{value}</SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger id="height">
                                <SelectValue placeholder="1/8"/>
                            </SelectTrigger>
                            <SelectContent>
                                {fractions.map((value, index) => (
                                    <div key={index}>
                                        <SelectItem value={value}>{value}</SelectItem>
                                    </div>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-between">
                    <Button variant='outline'>
                        Back
                    </Button>
                    <Button type="submit">
                        Continue
                    </Button>
                </div>  
            </form>
        </CardContent>
    </Card>
  )
}

export default DimensionsCard
