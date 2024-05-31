import React, { useCallback, useMemo } from "react";
import { Loader, Button } from "@flexisaf/flexibull2";
import theme from "./theme";

const UNKNOWN_STATE =
  "Something unexpected occured! Can't proceed with action at this time";
const DEFAULT_LOADER_SIZE = 64;

function WithLoader(props) {
  const {
    isLoading,
    isUpdating,
    loaderSize = DEFAULT_LOADER_SIZE,
    isUpdatingLoader,
    error,
    children,
    retry: retryFn,
    retriableOn = [],
    loader,
    errorComponent,
    ...styleProps
  } = props;

  const isShowUpdatingScreen = useMemo(
    () => isUpdating && isUpdatingLoader,
    [isUpdating, isUpdatingLoader]
  );

  const renderState = useCallback(() => {
    if (isLoading) return <Loader size={loaderSize} />;
    if (isShowUpdatingScreen) return isUpdatingLoader;
    if (error) {
      const retriable = retriableOn.includes(error.status);
      return (
        errorComponent || (
          <ErrorOccured
            message={error?.message}
            retry={retriable ? retryFn : null}
          />
        )
      );
    }
    return <ErrorOccured message={UNKNOWN_STATE} />;
  }, [
    isLoading,
    error,
    isShowUpdatingScreen,
    isUpdatingLoader,
    loader,
    retriableOn,
    retryFn,
    errorComponent,
    loaderSize,
  ]);

  if (!error && !isLoading && !isShowUpdatingScreen) return children;

  return React.createElement(WithLoaderWrapper, styleProps, renderState());
}

function ErrorOccured(props) {
  const { message, retry } = props;

  return (
    <ErrorOccuredWrapper>
      <div className="message"> {message}</div>
      {retry && (
        <Button color={theme.PrimaryRed} onClick={retry}>
          Retry
        </Button>
      )}
    </ErrorOccuredWrapper>
  );
}

export default WithLoader;

function WithLoaderWrapper(props) {
  const { width, height } = props;

  return (
    <div
      style={{
        width: width || "100%",
        height: height || "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}

function ErrorOccuredWrapper(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="message"
        style={{ marginBottom: "1em", color: theme.PrimaryRed }}
      />
    </div>
  );
}
