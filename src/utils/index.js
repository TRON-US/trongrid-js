const utils = {
    validateOptions(id, options) {
        switch (id) {
            case "get":
                if (!(typeof options.Show_assets === 'boolean')) options.Show_assets = false;
                if (!(typeof options.only_confirmed === 'boolean')) options.only_confirmed = false;
                if (!(typeof options.only_unconfirmed === 'boolean')) options.only_unconfirmed = false;
                break;
        }

        return options;
    }
};

export default {
    ...utils
}
