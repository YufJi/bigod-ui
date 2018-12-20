export const isInBrowser = typeof window !== 'undefined';

const isInWeChatFn = () => {
  if (!isInBrowser) {
    return false;
  }
  return /MicroMessenger/i.test(navigator.userAgent);
};

const isInCtripAppFn = () => {
    if (!isInBrowser) {
        return false;
    }
    return /(CtripWireless|sml_wireless|gs_wireless|we_wireless|TieyouWireless)/i.test(navigator.userAgent);
};

export const isInCtripApp = isInCtripAppFn();

export const isInMaster = isInBrowser ? /(Ctrip|Unicom|Pro)_CtripWireless/.test(navigator.userAgent) : false;

export const isInWeChat = isInWeChatFn()

export const noop = () => {}