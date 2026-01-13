/**
 * 마스터 데이터 접근 및 필터링 유틸리티 Composable
 *
 * 이 composable은 마스터 데이터(courses, reviews, instructors, faq)를
 * 각 페이지에서 쉽게 사용할 수 있도록 유틸리티 함수를 제공합니다.
 *
 * 사용 예:
 * const { getCoursesByIds, getInstructorById } = useData()
 * const courses = getCoursesByIds(['figma-master', 'vue3-guide'])
 */

import coursesData from '~/data/courses.json'
import reviewsData from '~/data/reviews.json'
import instructorsData from '~/data/instructors.json'
import faqData from '~/data/faq.json'

export function useData() {
  // ============================================
  // 강의 (Courses) 관련 함수
  // ============================================

  /**
   * 전체 강의 목록 반환
   */
  const getAllCourses = () => coursesData.list

  /**
   * ID 목록으로 강의 필터링 (순서 유지)
   * @param {string[]} ids - 강의 ID 배열
   */
  const getCoursesByIds = (ids) => {
    if (!ids || ids.length === 0) return coursesData.list
    return ids
      .map(id => coursesData.list.find(course => course.id === id))
      .filter(Boolean)
  }

  /**
   * 단일 강의 조회
   * @param {string} id - 강의 ID
   */
  const getCourseById = (id) => {
    return coursesData.list.find(course => course.id === id)
  }

  /**
   * 카테고리별 강의 필터링
   * @param {string} categoryId - 카테고리 ID ('all'이면 전체 반환)
   */
  const getCoursesByCategory = (categoryId) => {
    if (!categoryId || categoryId === 'all') return coursesData.list
    return coursesData.list.filter(course => course.category === categoryId)
  }

  /**
   * 강의에 강사 정보 결합
   * @param {Object} course - 강의 객체
   */
  const getCourseWithInstructor = (course) => {
    const instructor = getInstructorById(course.instructorId)
    return {
      ...course,
      instructorData: instructor
    }
  }

  /**
   * 강의 목록에 강사 정보 결합
   * @param {Object[]} courses - 강의 배열
   */
  const getCoursesWithInstructors = (courses) => {
    return courses.map(getCourseWithInstructor)
  }

  // ============================================
  // 강사 (Instructors) 관련 함수
  // ============================================

  /**
   * 전체 강사 목록 반환
   */
  const getAllInstructors = () => instructorsData.list

  /**
   * ID 목록으로 강사 필터링 (순서 유지)
   * @param {string[]} ids - 강사 ID 배열
   */
  const getInstructorsByIds = (ids) => {
    if (!ids || ids.length === 0) return instructorsData.list
    return ids
      .map(id => instructorsData.list.find(instructor => instructor.id === id))
      .filter(Boolean)
  }

  /**
   * 단일 강사 조회
   * @param {string} id - 강사 ID
   */
  const getInstructorById = (id) => {
    return instructorsData.list.find(instructor => instructor.id === id)
  }

  // ============================================
  // 후기 (Reviews) 관련 함수
  // ============================================

  /**
   * 전체 후기 목록 반환
   */
  const getAllReviews = () => reviewsData.list

  /**
   * ID 목록으로 후기 필터링 (순서 유지)
   * @param {string[]} ids - 후기 ID 배열
   */
  const getReviewsByIds = (ids) => {
    if (!ids || ids.length === 0) return reviewsData.list
    return ids
      .map(id => reviewsData.list.find(review => review.id === id))
      .filter(Boolean)
  }

  /**
   * 단일 후기 조회
   * @param {string} id - 후기 ID
   */
  const getReviewById = (id) => {
    return reviewsData.list.find(review => review.id === id)
  }

  /**
   * 포토 후기만 필터링
   * @param {number} limit - 최대 개수 (선택)
   */
  const getPhotoReviews = (limit) => {
    const photoReviews = reviewsData.list.filter(review => review.hasPhoto && review.image)
    return limit ? photoReviews.slice(0, limit) : photoReviews
  }

  /**
   * 카테고리별 후기 필터링
   * @param {string} categoryId - 카테고리 ID ('all'이면 전체 반환)
   */
  const getReviewsByCategory = (categoryId) => {
    if (!categoryId || categoryId === 'all') return reviewsData.list
    return reviewsData.list.filter(review => review.category === categoryId)
  }

  /**
   * 특정 강의의 후기 필터링
   * @param {string} courseId - 강의 ID
   */
  const getReviewsByCourseId = (courseId) => {
    return reviewsData.list.filter(review => review.courseId === courseId)
  }

  /**
   * 후기에 강의명 추가
   * @param {Object} review - 후기 객체
   */
  const getReviewWithCourseName = (review) => {
    const course = getCourseById(review.courseId)
    return {
      ...review,
      courseName: course?.title || review.courseName || '알 수 없는 강의'
    }
  }

  /**
   * 후기 목록에 강의명 추가
   * @param {Object[]} reviews - 후기 배열
   */
  const getReviewsWithCourseNames = (reviews) => {
    return reviews.map(getReviewWithCourseName)
  }

  // ============================================
  // FAQ 관련 함수
  // ============================================

  /**
   * 일반 FAQ 전체 목록 반환
   */
  const getAllGeneralFaq = () => faqData.general.list

  /**
   * ID 목록으로 일반 FAQ 필터링 (순서 유지)
   * @param {string[]} ids - FAQ ID 배열
   */
  const getGeneralFaqByIds = (ids) => {
    if (!ids || ids.length === 0) return faqData.general.list
    return ids
      .map(id => faqData.general.list.find(faq => faq.id === id))
      .filter(Boolean)
  }

  /**
   * 강의별 Q&A 전체 목록 반환
   */
  const getAllCourseQnA = () => faqData.courseQnA.list

  /**
   * 특정 강의의 Q&A 필터링
   * @param {string} courseId - 강의 ID
   */
  const getCourseQnAByCourseId = (courseId) => {
    if (!courseId || courseId === 'all') return faqData.courseQnA.list
    return faqData.courseQnA.list.filter(qna => qna.courseId === courseId)
  }

  /**
   * Q&A에 강의명 추가
   * @param {Object} qna - Q&A 객체
   */
  const getQnAWithCourseName = (qna) => {
    const course = getCourseById(qna.courseId)
    return {
      ...qna,
      courseName: course?.title || '알 수 없는 강의'
    }
  }

  /**
   * Q&A 목록에 강의명 추가
   * @param {Object[]} qnaList - Q&A 배열
   */
  const getQnAListWithCourseNames = (qnaList) => {
    return qnaList.map(getQnAWithCourseName)
  }

  /**
   * Q&A에서 사용 가능한 강의 목록 반환
   * (Q&A가 있는 강의만)
   */
  const getCoursesWithQnA = () => {
    const courseIds = [...new Set(faqData.courseQnA.list.map(qna => qna.courseId))]
    return getCoursesByIds(courseIds)
  }

  return {
    // 강의
    getAllCourses,
    getCoursesByIds,
    getCourseById,
    getCoursesByCategory,
    getCourseWithInstructor,
    getCoursesWithInstructors,

    // 강사
    getAllInstructors,
    getInstructorsByIds,
    getInstructorById,

    // 후기
    getAllReviews,
    getReviewsByIds,
    getReviewById,
    getPhotoReviews,
    getReviewsByCategory,
    getReviewsByCourseId,
    getReviewWithCourseName,
    getReviewsWithCourseNames,

    // FAQ
    getAllGeneralFaq,
    getGeneralFaqByIds,
    getAllCourseQnA,
    getCourseQnAByCourseId,
    getQnAWithCourseName,
    getQnAListWithCourseNames,
    getCoursesWithQnA
  }
}
