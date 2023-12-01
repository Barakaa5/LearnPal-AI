import { Chip, Divider, Group, useMantineTheme } from '@mantine/core';
import { Fragment } from 'react';

type FilterChipsProps = {
  filters: string[];
  selectedFilters: string[];
  onFilterChange: (selected: string[]) => void;
};

const FilterChips = ({
  filters,
  selectedFilters,
  onFilterChange,
}: FilterChipsProps) => {
  const theme = useMantineTheme();
  return (
    <Chip.Group multiple value={selectedFilters} onChange={onFilterChange}>
      <Group gap={12}>
        {filters.map((contentType, index, arr) => (
          <Fragment key={contentType}>
            <Chip
              color={theme.colors.lightPurple[0]}
              variant="filled"
              value={contentType.toLowerCase()}
              size="md"
            >
              {contentType}
            </Chip>
            {index !== arr.length - 1 && (
              <Divider size="sm" orientation="vertical" />
            )}
          </Fragment>
        ))}
      </Group>
    </Chip.Group>
  );
};

export default FilterChips;
