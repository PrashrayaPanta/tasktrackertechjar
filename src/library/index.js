import dayjs from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export const dtFormat = (dt, format = "lll") => dayjs(dt).format(format);
