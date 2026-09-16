import { SunIcon, SunCloudIcon, StormIcon, CloudQuestionIcon } from "./icons";

const ICONS = {
  favoravel: SunIcon,
  moderado: SunCloudIcon,
  arriscado: StormIcon,
  indisponivel: CloudQuestionIcon,
};

export function WeatherIcon({ classificacao }) {
  const Icone = ICONS[classificacao] ?? CloudQuestionIcon;
  return <Icone />;
}
