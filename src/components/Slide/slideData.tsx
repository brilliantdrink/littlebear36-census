import {JSX} from 'solid-js'

import ageFile from "../../data/age.csv"
import genderFile from "../../data/gender.csv"
import politicsFile from "../../data/politics.csv"
import ethnicityFile from "../../data/ethnicity.csv"
import religionFile from "../../data/religion.csv"
import sexualityFile from "../../data/sexuality.csv"
import heightFile from "../../data/height.csv"
import transFile from "../../data/trans.csv"
import locationFile from "../../data/location.csv"
import originFile from "../../data/origin.csv"
import salaryFile from "../../data/salary.csv"
import educationFile from "../../data/education.csv"
import weebFile from "../../data/weeb.csv"
import eatingFile from "../../data/eating.csv"
import neurodivergenceFile from "../../data/neurodivergence.csv"
import languagesFile from "../../data/languages.csv"

import asyncPollAgeFile from "../../data/g-age.csv"
import asyncPollGenderFile from "../../data/g-gender.csv"
import asyncPollPoliticsFile from "../../data/g-politics.csv"
import asyncPollEthnicityFile from "../../data/g-ethnicity.csv"
import asyncPollReligionFile from "../../data/g-religion.csv"
import asyncPollSexualityFile from "../../data/g-sexuality.csv"
import asyncPollHeightFile from "../../data/g-height.csv"
import asyncPollTransFile from "../../data/g-trans.csv"
import asyncPollLocationFile from "../../data/g-location.csv"
import asyncPollOriginFile from "../../data/g-origin.csv"
import asyncPollSalaryFile from "../../data/g-salary.csv"
import asyncPollEducationFile from "../../data/g-education.csv"
import asyncPollWeebFile from "../../data/g-weeb.csv"
import asyncPollEatingFile from "../../data/g-eating.csv"
import asyncPollNeurodivergenceFile from "../../data/g-neurodivergence.csv"
import asyncPollLanguagesFile from "../../data/g-languages.csv"
import asyncPollLanguageFile from "../../data/g-language.csv"
import asyncPollYearsWatchedFile from "../../data/g-years-watched.csv"

interface SlideData {
  name: string,
  fileUrl?: string
  asyncPollFileUrl?: string
  note?: string | JSX.Element
}

export const barChartSlides: SlideData[] = [{
  name: 'Age',
  fileUrl: ageFile,
  asyncPollFileUrl: asyncPollAgeFile,
}, {
  name: 'Gender',
  fileUrl: genderFile,
  asyncPollFileUrl: asyncPollGenderFile,
}, {
  name: 'Political Ideology',
  fileUrl: politicsFile,
  asyncPollFileUrl: asyncPollPoliticsFile,
}, {
  name: 'Ethnicity',
  note: 'Asynchronous poll is multiple choice, percentages are of participant count',
  fileUrl: ethnicityFile,
  asyncPollFileUrl: asyncPollEthnicityFile,
}, {
  name: 'Religion',
  fileUrl: religionFile,
  asyncPollFileUrl: asyncPollReligionFile,
}, {
  name: 'Sexuality',
  fileUrl: sexualityFile,
  asyncPollFileUrl: asyncPollSexualityFile,
}, {
  name: 'Height',
  fileUrl: heightFile,
  asyncPollFileUrl: asyncPollHeightFile,
}, {
  name: 'Trans Chatters',
  fileUrl: transFile,
  asyncPollFileUrl: asyncPollTransFile,
}, {
  name: 'Location',
  fileUrl: locationFile,
  asyncPollFileUrl: asyncPollLocationFile,
}, {
  name: 'Origin',
  fileUrl: originFile,
  asyncPollFileUrl: asyncPollOriginFile,
}, {
  name: 'Salary',
  fileUrl: salaryFile,
  asyncPollFileUrl: asyncPollSalaryFile,
}, {
  name: 'Education',
  fileUrl: educationFile,
  asyncPollFileUrl: asyncPollEducationFile,
}, {
  name: 'Weebs',
  fileUrl: weebFile,
  asyncPollFileUrl: asyncPollWeebFile,
}, {
  name: 'Diet',
  fileUrl: eatingFile,
  asyncPollFileUrl: asyncPollEatingFile,
}, {
  name: 'Neurodiversity',
  fileUrl: neurodivergenceFile,
  asyncPollFileUrl: asyncPollNeurodivergenceFile,
}, {
  name: 'Multilingualism',
  fileUrl: languagesFile,
  asyncPollFileUrl: asyncPollLanguagesFile,
}, {
  name: 'Languages (Fluent)',
  note: 'Asynchronous poll is multiple choice, percentages are of participant count',
  asyncPollFileUrl: asyncPollLanguageFile,
}, {
  name: 'Years Watched',
  asyncPollFileUrl: asyncPollYearsWatchedFile,
}]
