import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function omitBy(object, predicate) {
  const newObj = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      if (!predicate(object[key])) {
        newObj[key] = object[key];
      }
    }
  }
  return newObj;
}

export function useQueryStateSync(initialQueryState, adapter) {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryState, setQueryStateObj] = useState(initialQueryState);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newQueryState = {};
    for (const [key, value] of params.entries()) {
      newQueryState[key] = value;
    }
    setQueryStateObj((prevFilters) =>
      omitNullOrEmptyString({ ...prevFilters, ...newQueryState })
    );
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryState)) {
      params.set(key, value);
    }
    const newSearch = params.toString();
    navigate({ search: newSearch });
  }, [queryState, navigate]);

  const setQueryField = useCallback((name, value) => {
    setQueryStateObj((prevFilters) =>
      omitNullOrEmptyString({
        ...prevFilters,
        [name]: value,
      })
    );
  }, []);

  const updateQueryState = useCallback((newQueryState) => {
    setQueryStateObj((prev) =>
      omitNullOrEmptyString({ ...prev, ...newQueryState })
    );
  }, []);

  const resetQueryState = () => {
    setQueryStateObj(omitNullOrEmptyString(initialQueryState));
  };

  const extraMethods = useMemo(() => {
    if (!adapter) return {};
    return adapter(queryState, setQueryField, updateQueryState);
  }, [adapter, queryState, setQueryField, updateQueryState]);

  return {
    queryState,
    setQueryField,
    updateQueryState,
    resetQueryState,
    ...extraMethods,
  };
}

function omitNullOrEmptyString(val) {
  const newVal = omitBy(
    val,
    (val) => val === "" || val === null || val === undefined
  );
  return newVal;
}
