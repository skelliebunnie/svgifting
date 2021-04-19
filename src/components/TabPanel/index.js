import { Box } from '@material-ui/core'

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}-gifts`}
      {...other}
    >
      {value === index && (
        <Box>
        {children}
        </Box>
      )}
    </div>
  );
}
