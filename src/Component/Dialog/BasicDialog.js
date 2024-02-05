import React from "react";
/** Components Import */
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material";

function BasicDialog({
	open = false,                   // dialog open value.           "true" or "false"
	title = 'Dialog Title',         // dialog Title
	children,                       // dialog children, sub-content in Dialog
	disableEscapeKeyDown = false,   // disable onClose callback.    "true" or "false"
	fullScreen = false,             // using fullscreen dialog.     "true" or "false"
	fullWidth = false,              // using fullWidth dialog.      "true" or "false"
	maxWidth = 'sm',                // determine maxium dialog width.       "xs" or "sm" or "md" or "lg" or "xl" or false or string
	style = {},                     // mui style
	sx = {},                        // mui inline-style object
	onClose = () => { },            // dialog Close ACtion
	onSave = () => { },             // dialog Save ACtion
	useSaveAfterClose = true,		// click save button and after auto close.	"true" or "false"
	scroll = 'paper',               // dialog scrool
	closeButtonName = 'Close',      // close button name
	saveButtonName = 'Save',        // save button name
	useSaveButton = true,           // using save button
	titleSx = {},                   // mui inline-style object for title
	bodySx = {},                    // mui inline-style object for body
	dividers = false,               // draw divide line in title and body.     "true" or "false"
	actionSx = {},                  // mui inline-style object for action
	disableSpacing = false,         // delete margin between actions.   "true" or "false"
}) {
	const CloseButton = () => {
		onClose();
	};

	const SaveButton = () => {
		onSave();
		useSaveAfterClose && onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={CloseButton}
			style={style}
			sx={sx}
			scroll={scroll}
			disableEscapeKeyDown={disableEscapeKeyDown}
			fullScreen={fullScreen}
			fullWidth={fullWidth}
			maxWidth={maxWidth}
		>
			<DialogTitle sx={titleSx}>
				{title}
			</DialogTitle>
			<DialogContent sx={bodySx} dividers={dividers}>
				{children}
			</DialogContent>
			<DialogActions
				sx={actionSx}
				disableSpacing={disableSpacing}
			>
				{useSaveButton && <Button onClick={SaveButton}>{saveButtonName}</Button>}
				<Button onClick={CloseButton}>{closeButtonName}</Button>
			</DialogActions>
		</Dialog>
	);
}

export default BasicDialog;