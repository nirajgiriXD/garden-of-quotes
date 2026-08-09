import { CheckIcon, ChevronsUpDownIcon, TagIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ANY_TAG, formatTag } from "@/lib/quotes";
import { cn } from "@/lib/utils";

type TagFilterProps = {
  tags: string[];
  counts: Map<string, number>;
  value: string;
  onChange: (tag: string) => void;
  disabled?: boolean;
};

export function TagFilter({
  tags,
  counts,
  value,
  onChange,
  disabled,
}: TagFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={`Filter by tag, currently ${formatTag(value)}`}
          disabled={disabled}
          className="w-full justify-between font-normal sm:w-52"
        >
          <span className="flex min-w-0 items-center gap-2">
            <TagIcon className="text-muted-foreground" />
            <span className="truncate">
              {value === ANY_TAG ? "All tags" : formatTag(value)}
            </span>
          </span>
          <ChevronsUpDownIcon className="text-muted-foreground size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-56 p-0">
        <Command>
          <CommandInput placeholder="Find a tag…" />
          <CommandList>
            <CommandEmpty>No matching tag</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag}
                  value={tag}
                  onSelect={() => {
                    onChange(tag);
                    setOpen(false);
                  }}
                  className="items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <CheckIcon
                      className={cn(
                        "size-4",
                        value === tag ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {tag === ANY_TAG ? "All tags" : formatTag(tag)}
                  </span>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {counts.get(tag) ?? 0}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
