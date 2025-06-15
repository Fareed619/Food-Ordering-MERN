import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  searchQuery: z
    .string({
      required_error: "Restaurant name is required",
    })
    .min(1, "Restaurant name is required"),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSumbit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};
const SearchBar = ({ onSumbit, onReset, placeHolder, searchQuery }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    reset({ searchQuery });
  }, [searchQuery, reset]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSumbit)}
      className={`md:w-[80%] mx-auto p-3 relative `}
    >
      <Search className="absolute bottom-6 left-5 text-orange-500" />
      <input
        type="text"
        placeholder={placeHolder}
        className={` w-full p-3 rounded-full pl-10 border-gray-400 outline-none ${
          errors.searchQuery && "border-2 border-red-500"
        } `}
        {...register("searchQuery")}
      />
      <div className="flex gap-1 w-[93%] sm:w-[95%] mx-auto md:w-fit absolute -bottom-7  md:right-6 md:bottom-5">
        {isDirty && (
          <button
            type="button"
            onClick={handleReset}
            className="py-1.5 px-4 w-full cursor-pointer  rounded-full text-sm border border-gray-500 "
          >
            Reset
          </button>
        )}
        <button
          type="submit"
          className="py-1.5 px-4 cursor-pointer w-full mx-auto md:w-fit bg-orange-500 text-white rounded-full text-sm "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
