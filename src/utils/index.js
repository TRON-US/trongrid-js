const utils = {
    validateOptions: (id, options) => {
        switch (id) {
            case "getAccount":
                if (!(typeof options.show_assets === 'boolean')) options.show_assets = false;
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
