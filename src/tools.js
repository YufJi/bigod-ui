export const isInBrowser = typeof window !== 'undefined';

const isInWeChatFn = () => {
  if (!isInBrowser) {
    return false;
  }
  return /MicroMessenger/i.test(navigator.userAgent);
};

export const isInWeChat = isInWeChatFn()

export const noop = () => {}
