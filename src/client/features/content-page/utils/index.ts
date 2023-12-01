import { ContentItem, ContentType, PlanType } from '../types';

export const isInPlan = (
  item: ContentItem,
  type: ContentType,
  plan: PlanType
): boolean => {
  const identifiers = {
    courses: 'id',
    books: 'ISBN_13',
    podcasts: 'id',
    movies: 'imdbID',
    youtube: 'title',
  };

  const identifier = identifiers[type];
  const isItemInPlan = (plan[type] as ContentItem[]).some(
    (planItem: ContentItem) =>
      planItem[identifier as keyof ContentItem] ===
      item[identifier as keyof ContentItem]
  );
  return isItemInPlan;
};
