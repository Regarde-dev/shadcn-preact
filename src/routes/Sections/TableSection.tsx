import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alertDialog";
import { Button } from "@ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";
import { Trash } from "lucide-preact";

const data: { title: string; pages: number; author: string; price: string }[] = [
  {
    title: "One Hundred Years of Solitude",
    pages: 417,
    author: "Gabriel García Márquez",
    price: "12.99",
  },
  {
    title: "Don Quixote",
    pages: 1023,
    author: "Miguel de Cervantes",
    price: "15.50",
  },
  {
    title: "Love in the Time of Cholera",
    pages: 368,
    author: "Gabriel García Márquez",
    price: "10.99",
  },
  {
    title: "The Shadow of the Wind",
    pages: 575,
    author: "Carlos Ruiz Zafón",
    price: "14.99",
  },
  {
    title: "1984",
    pages: 328,
    author: "George Orwell",
    price: "9.99",
  },
  {
    title: "The Tunnel",
    pages: 288,
    author: "Ernesto Sabato",
    price: "11.50",
  },
  {
    title: "Chronicle of a Death Foretold",
    pages: 120,
    author: "Gabriel García Márquez",
    price: "8.99",
  },
  {
    title: "Fictions",
    pages: 224,
    author: "Jorge Luis Borges",
    price: "13.50",
  },
  {
    title: "Hopscotch",
    pages: 600,
    author: "Julio Cortázar",
    price: "16.00",
  },
  {
    title: "The Little Prince",
    pages: 96,
    author: "Antoine de Saint-Exupéry",
    price: "7.99",
  },
];

export function TableSection() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-10">
      <Table className="min-w-[720px]">
        <TableCaption>List of my Books</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Pages</TableHead>
            <TableHead className="text-end">Price</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((b) => (
            <TableRow>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.pages}</TableCell>
              <TableCell className="text-end">{b.price}</TableCell>
              <TableCell className="text-center flex flex-row items-center justify-center">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            size="icon"
                            variant="destructive"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">Remove</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the book from your library.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}
