"use client"

import { Button } from "@/components/ui/Button"

interface FilterChipsProps {
  options: string[]
  selectedFilters: string[]
  onFilterChange: (filters: string[]) => void
}

export function FilterChips({ options, selectedFilters, onFilterChange }: FilterChipsProps) {
  const handleToggle = (option: string) => {
    if (selectedFilters.includes(option)) {
      onFilterChange(selectedFilters.filter(f => f !== option))
    } else {
      onFilterChange([...selectedFilters, option])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option}
          variant={selectedFilters.includes(option) ? "default" : "outline"}
          size="sm"
          onClick={() => handleToggle(option)}
          className="rounded-full"
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
