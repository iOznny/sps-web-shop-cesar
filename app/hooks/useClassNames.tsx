const useClassNames = () => {
    return (...classes: string[]) => classes.filter(Boolean).join(" ");
}

export default useClassNames;
  