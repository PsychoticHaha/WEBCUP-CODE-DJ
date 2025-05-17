import { useIntl, FormattedMessage } from 'react-intl';

/**
 * A variant of FormattedMessage that won't throw if the message with the given id
 * doesn't exist in the current locale. Instead, it will display the defaultMessage
 * if it is provided, or the id itself.
 *
 * This is useful for cases where we're not sure if the key will exist in the
 * current locale, but we still want to provide a reasonable default.
 *
 * @param id The id of the message to look up
 * @param defaultMessage The message to display if the key isn't found
 * @param props Any valid props for FormattedMessage component
 */
function SafeFormattedMessage({ id, defaultMessage, values, ...props }: { id: string, defaultMessage?: string, values?: {}, props?: any }) {
  const intl = useIntl();
  const messages = intl?.messages || {};

  let messageToDisplay;

  if (messages[id]) {
    return <FormattedMessage id={id} defaultMessage={defaultMessage} values={values} {...props} />;
  } else {
    messageToDisplay = defaultMessage || id || '';
  }

  return <>{messageToDisplay}</>;
}
export default SafeFormattedMessage;