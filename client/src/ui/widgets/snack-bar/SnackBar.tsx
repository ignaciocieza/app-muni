import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { resetSnackbar } from "../../../api/actions/commonActions";
import { Button } from "@material-ui/core";

interface props {
  variant: "default" | "error" | "success" | "warning" | "info" | undefined;
  message: string;
  isResetErrors?: boolean;
  persist?: boolean;
}

function MyApp({ variant, message, isResetErrors }: props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  //   useEffect(()=>{
  //     enqueueSnackbar(message, {
  //         variant,
  //         preventDuplicate: true,
  //         // onExited: () => {
  //         //   isResetErrors && dispatch(resetErrors());
  //         // },
  //       });
  //   },[message])

  enqueueSnackbar(message, {
    variant,
    preventDuplicate: true,
    onExited: () => {
      isResetErrors && dispatch(resetSnackbar());
    },
  });

  return <React.Fragment></React.Fragment>;
}

function MyApp2({ variant, message, persist }: props) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar(message, {
      variant,
      preventDuplicate: true,
      persist: persist,
    });
  }, []);

  return <React.Fragment></React.Fragment>;
}

interface IntegrationNotistackProps {
  variant: "default" | "error" | "success" | "warning" | "info";
  hPosition?: "left" | "center" | "right";
  vPosition?: "top" | "bottom";
  message: string;
  isResetErrors?: boolean;
  persist?: boolean;
}

/**
 * Important!: Must be add the error to the reducer "RESET_ERRORS"
 * @param param0
 */
export default function IntegrationNotistack({
  variant,
  hPosition = "left",
  vPosition = "bottom",
  message,
  isResetErrors,
  persist,
}: IntegrationNotistackProps) {
  const notistackRef = React.useRef(null!);
  const dispatch = useDispatch();
  const onClickDismiss = (key: any) => {
    //@ts-ignore
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: vPosition,
        horizontal: hPosition,
      }}
      ref={notistackRef}
      action={(key) => {
        if (persist) {
          return (
            <Button
              variant="text"
              style={{
                padding: "4px 8px",
                fontSize: " 0.8125rem",
                minWidth: 64,
                backgroundColor: "inherit",
              }}
              onClick={() => {
                dispatch(resetSnackbar());
                onClickDismiss(key);
              }}
            >
              {/* Ok */}
            </Button>
          );
        } else {
          return null;
        }
      }}
    >
      {persist ? (
        <MyApp2 variant={variant} message={message} persist={persist} />
      ) : (
        <MyApp
          variant={variant}
          message={message}
          isResetErrors={isResetErrors}
          //persist={persist}
        />
      )}
    </SnackbarProvider>
  );
}
