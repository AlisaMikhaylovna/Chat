import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const state = true;

function TestPage() {
    return (
        <div>
            <Button className={cn("bg-indigo-300",state&&"text-red-400")}>Click me</Button>
        </div>
    );
};

export default TestPage;

