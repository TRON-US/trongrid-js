const utils = {
    validateOptions: (id, options) => {
        switch (id) {
            case "getAccount":
                if (!(typeof options.show_assets === 'boolean')) options.show_assets = false;
                if (!(typeof options.only_confirmed === 'boolean')) options.only_confirmed = false;
                if (!(typeof options.only_unconfirmed === 'boolean')) options.only_unconfirmed = false;
                break;
            case "getAssets":
                if (!(typeof options.is_name === 'boolean')) options.is_name = false;
                if (!(Number.isInteger(options.limit))) options.limit = 20;
                if (!(typeof options.only_confirmed === 'boolean')) options.only_confirmed = false;
                if (!(typeof options.only_unconfirmed === 'boolean')) options.only_unconfirmed = false;
                if (!(typeof options.sort === 'string')) options.sort = '-start_time';
                break;
        }

        return options;
    }
};

export default {
    ...utils
}
