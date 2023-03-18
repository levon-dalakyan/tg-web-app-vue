<template>
    <div>
        <label
            class="base-input"
            :class="[
                className,
                {
                    focused: focused,
                    completed: completed,
                    error: inputError,
                    disabled: inputProgress,
                },
            ]"
        >
            <div class="base-input__row">
                <textarea
                    v-if="textarea"
                    class="base-input__textarea"
                    :class="{ notEmptyInput: notEmpty }"
                    :id="id"
                    :ref="id"
                    :required="!isNotRequired"
                    :maxlength="limit"
                    @focus="focused = true"
                    @blur="
                        focused = false;
                        validate($event);
                    "
                    @keydown="
                        resizeTextareaKeydownHandler($event.target);
                        validate($event);
                    "
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    :disabled="inputProgress"
                ></textarea>
                <div v-else class="base-input__input-wrapper">
                    <div
                        v-if="symbol && !inputError && inputLabelTop"
                        class="base-input__symbol"
                    >
                        {{ symbol }}
                    </div>
                    <input
                        ref="input"
                        class="base-input__input"
                        :class="{
                            notEmptyInput: notEmpty,
                            symbol: symbol,
                        }"
                        :type="inputType"
                        :id="id"
                        :required="!isNotRequired"
                        :maxlength="limit"
                        @focus="focused = true"
                        @blur="
                            focused = false;
                            validate($event);
                            inputType === 'email' && validateEmail($event);
                        "
                        @keyup="
                            validate($event);
                            inputType === 'email' && validateEmail($event);
                        "
                        :value="modelValue"
                        @input="$emit('update:modelValue', $event.target.value)"
                        :disabled="inputProgress"
                    />
                </div>
                <img
                    v-if="inputError"
                    :src="errorImg"
                    class="base-input__img"
                    :class="{
                        textareaIcon: textarea,
                        textareaAlingIcon: textarea,
                        inputIcon: !textarea,
                    }"
                />
                <img
                    v-else-if="isShownCheck"
                    :src="success"
                    class="base-input__img"
                    :class="{
                        textareaIcon: textarea,
                        textareaAlingIcon: textarea,
                        inputIcon: !textarea,
                    }"
                />
            </div>
            <div
                class="base-input__placeholder placeholder"
                :class="{
                    textareaFloatingLabel: textarea,
                    textareaAlignPlaceholder: textarea,
                    textareaLabelOnTop: inputLabelTop && textarea,
                    inputFloatingLabel: !textarea,
                    inputLabelOnTop: inputLabelTop && !textarea,
                    labelProgress: inputProgress,
                }"
            >
                {{ this.placeholder }}
            </div>
        </label>
        <div v-if="withErrorMessage" class="error-message">
            {{ errorMessage }}
        </div>
        <div v-else-if="inputError" class="error-required">Required field</div>
    </div>
</template>

<script>
import errorImg from "../assets/images/login/error.svg";
import success from "../assets/images/login/success.svg";

export default {
    name: "BaseInput",
    setup() {
        return {
            errorImg,
            success,
        };
    },
    props: {
        modelValue: [String, Number],
        placeholder: { type: String, required: true },
        inputType: { type: String, default: "text" },
        id: { type: String, required: true },
        notEmpty: Boolean,
        progress: Boolean,
        disabled: Boolean,
        autofocus: { type: Boolean, default: false },
        limit: Number,
        textarea: Boolean,
        error: Boolean,
        isNotRequired: { type: Boolean, default: false },
        withErrorMessage: { type: Boolean, default: false },
        errorMessage: String,
        withCheck: Boolean,
        symbol: String,
        className: String,
    },
    data() {
        return {
            focused: false,
            isValid: true,
            isValidEmail: true,
            modelValueFirst: false,
            canUpdate: true,
        };
    },
    computed: {
        inputError() {
            return (
                (!this.isValid || !this.isValidEmail || this.error) &&
                !this.focused &&
                !this.isNotRequired &&
                !this.disabled &&
                !this.modelValue
            );
        },
        inputProgress() {
            return (this.progress && !this.error) || this.disabled;
        },
        inputLabelTop() {
            return this.focused || this.isModelValue;
        },
        completed() {
            return this.isModelValue && !this.focused && !this.disabled;
        },
        isModelValue() {
            if (this.modelValue?.toString().trim()) {
                return true;
            } else return false;
        },
        isShownCheck() {
            return this.isModelValue && !this.focused && this.withCheck;
        },
    },
    methods: {
        inputClass() {
            if (this.value?.length > 0) return "__filled";
            return "__empty";
        },
        validate(event) {
            const value = event.target.value;
            const isValid = value.trim() !== "";
            if (isValid) {
                this.isValid = true;
                this.$emit("errorHandler", false);
            } else {
                this.isValid = false;
            }
        },
        validateEmail(event) {
            const value = event.target.value;
            const isValid = value.includes("@");
            if (isValid) {
                this.isValidEmail = true;
            } else {
                this.isValidEmail = false;
            }
        },
        resizeTextarea() {
            const area = this.$refs[this.id];
            if (area) {
                area.style.overflow = "hidden";
                area.style.height = area.scrollHeight + 24 + "px";
            }
        },
        resizeTextareaKeydownHandler(area) {
            area.style.overflow = "hidden";
            area.style.height = area.scrollHeight + "px";
        },
        focusInput() {
            this.$refs.input.focus();
        },
        unfocusInput() {
            this.$refs.input.blur();
        },
    },
    watch: {
        modelValue(_, oldVal) {
            if (!oldVal) {
                this.modelValueFirst = true;
            } else this.modelValueFirst = false;
        },
    },
    mounted() {
        this.resizeTextarea();
        if (this.autofocus) {
            this.focusInput();
        }
    },
    updated() {
        if (this.canUpdate && this.modelValue) {
            this.resizeTextarea();
        }
        this.canUpdate = false;

        if (this.disabled && document.activeElement === this.$refs.input) {
            this.unfocusInput();
        }
    },
};
</script>

<style scoped lang="scss">
.base-input {
    outline: 1px solid #d8d5db;
    background-color: #fff;
    position: relative;
    padding-top: 8px;
    padding-inline: 18px;
    border-radius: 12px;
    display: block;
    cursor: text;

    &:hover,
    input:hover,
    textarea:hover {
        cursor: pointer;
    }

    &:hover {
        .placeholder {
            color: #000;
        }

        .inputLabelOnTop {
            color: #a6a6a6;
        }
        .textareaLabelOnTop {
            color: #a6a6a6;
        }
    }

    &.focused {
        outline: 1px solid #7000ff;
        background-color: #fff;
        cursor: text;

        input,
        textarea {
            cursor: text;
        }
    }

    &__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__input-wrapper {
        display: flex;
        align-items: flex-end;
        flex-grow: 1;
    }

    &__symbol {
        margin-bottom: -2.5px;
    }

    &__input {
        &.symbol {
            padding-left: 2px;
        }
    }

    &__textarea {
        width: 100%;
    }

    &__img {
        margin-left: 8px;
    }

    &__placeholder {
        font-size: 18px;
        line-height: 12px;

        &.inputLabelOnTop {
            color: #a6a6a6;
            font-size: 14px;
            transform: translate(0, -36px);
        }
        &.textareaLabelOnTop {
            color: #a6a6a6;
            font-size: 14px;
            transform: translate(0, -74px);
        }
    }

    &.error {
        outline: 1px solid #ff002b;

        .placeholder {
            color: #ff002b;
        }

        input {
            color: #808080;
        }

        &:hover input {
            color: #000;
        }
    }

    &.disabled {
        background-color: #f7f7f7;
        outline: 1px solid #ece9f0;
        cursor: default;

        input,
        textarea {
            color: #808080;
        }

        .base-input__symbol {
            color: #808080;
        }

        &:hover {
            & input,
            & textarea {
                cursor: default;
            }

            & .placeholder {
                color: #808080;
            }

            & .inputLabelOnTop {
                color: #a6a6a6;
            }
            & .textareaLabelOnTop {
                color: #a6a6a6;
            }
        }
    }
}

/*   className/   */
.style-02 {
    background-color: #f7f6f5;
    outline: none;

    &.completed:hover {
        background-color: #f2f1f0;
    }

    &.error {
        background-color: #fff0f2;
        outline: none !important;

        &:hover {
            background-color: #fff0f2;
        }

        .placeholder {
            color: #ff002b;
        }
    }

    &.disabled {
        outline: none !important;
        background-color: #f7f6f5;

        &:hover {
            outline: none !important;
            cursor: default;
        }
    }
}

.bold {
    input,
    textarea {
        font-weight: 500;
    }
}

.size-16 {
    input,
    textarea {
        font-size: 16px;
        line-height: 24px;
    }

    .placeholder {
        margin-top: 2px;
        font-size: 16px;
    }

    .inputLabelOnTop {
        font-size: 12px;
    }
    .textareaLabelOnTop {
        font-size: 12px;
    }
}

.bg-white {
    background-color: #fff;
}

.phone-input {
    .base-input__symbol {
        color: #a6a6a6;
    }
}

/*   /className   */

.inputFloatingLabel {
    transform: translate(0, -24px);
    color: #808080;
    transition: transform 0.3s, font-size 0.3s;
    font-weight: 300;
}
.textareaFloatingLabel {
    transform: translate(0, -60px);
    color: #808080;
    transition: transform 0.3s, font-size 0.3s;
    font-weight: 300;
}

.inputIcon {
    margin-top: 7px;
}
.textareaIcon {
    margin-top: -25px;
}
input {
    background-color: transparent;
    border: 0;
    font-size: 18px;
    line-height: 28px;
    width: 100%;
    height: 100%;
    outline: 0;
    padding: 0;
    margin-top: 21px;
    transition: all 0.3s;
    font-weight: 300;
}
input[type="number"] {
    -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="file"] {
    display: none;
}
textarea {
    font-size: 18px;
    font-weight: 300;
    border: none;
    padding: 0 0 20px 0;
    margin-top: 21px;
    overflow: auto;
    outline: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none;

    &.base-input {
        position: relative;
    }
}
.textareaAlingIcon {
    align-self: flex-start;
    padding-top: 32px;
}
.textareaAlignPlaceholder {
    position: absolute;
    top: 87px;
    left: 18px;
}
.labelProgress {
    color: #808080;
}

.error-message {
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    margin: 6px 24px 0;
    color: #ff002b;
}

.error-required {
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: #ff002b;
    padding-left: 24px;
    margin-top: 6px;
}
</style>
