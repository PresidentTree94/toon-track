import { useState, useEffect } from "react";
import { useForm } from "@presidenttree94/form-utils";

export function useGalleryFilters<T>({
  data,
  searchParams,
  initialForm,
  formConfig,
  filterFn,
}: {
  data: T[];
  searchParams: URLSearchParams;
  initialForm: any;
  formConfig: any;
  filterFn: (item: T, form: any, search: string) => boolean;
}) {
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const { form, elements, reset } = useForm(initialForm, formConfig);

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    reset();
  }, [searchParams]);

  const filteredData = data.filter(item => filterFn(item, form, search));

  return { search, setSearch, elements, filteredData };
}